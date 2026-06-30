#!/usr/bin/env python3
import json
import os
import subprocess
import time
from email.message import EmailMessage
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


HOST = os.environ.get("DONGYAN_CONSULTATION_HOST", "127.0.0.1")
PORT = int(os.environ.get("DONGYAN_CONSULTATION_PORT", "8787"))
STATE_DIR = Path(os.environ.get("DONGYAN_CONSULTATION_STATE_DIR", "/var/lib/dongyan-consultations"))
RECIPIENT = os.environ.get("DONGYAN_CONSULTATION_TO", "").strip()
SENDER = os.environ.get("DONGYAN_CONSULTATION_FROM", "no-reply@dongyandesign.cn").strip()
SENDMAIL = os.environ.get("DONGYAN_SENDMAIL", "/usr/sbin/sendmail")
MAX_BODY_BYTES = 16 * 1024


FIELDS = [
    ("name", "称呼", 80),
    ("wechat", "微信", 120),
    ("city", "城市", 80),
    ("area", "面积", 80),
    ("stage", "项目阶段", 80),
    ("preferredTime", "希望沟通时间", 120),
    ("budget", "预算边界", 120),
    ("problem", "主要问题", 800),
]


def clean_value(value, limit):
    if not isinstance(value, str):
        return ""
    return " ".join(value.replace("\x00", "").strip().split())[:limit]


def json_response(handler, status, payload):
    body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
    handler.send_response(status)
    handler.send_header("Content-Type", "application/json; charset=utf-8")
    handler.send_header("Cache-Control", "no-store")
    handler.send_header("Content-Length", str(len(body)))
    handler.end_headers()
    handler.wfile.write(body)


def append_record(record):
    STATE_DIR.mkdir(mode=0o750, parents=True, exist_ok=True)
    path = STATE_DIR / "submissions.jsonl"
    with path.open("a", encoding="utf-8") as fh:
        fh.write(json.dumps(record, ensure_ascii=False) + "\n")
    try:
        path.chmod(0o640)
    except OSError:
        pass


def send_email(record):
    if not RECIPIENT:
        return False

    message = EmailMessage()
    message["From"] = SENDER
    message["To"] = RECIPIENT
    message["Subject"] = f"新的预约沟通：{record['fields'].get('name') or '未填写称呼'}"

    lines = [
        "网站收到一条新的预约沟通信息。",
        "",
        f"提交时间：{record['createdAt']}",
        f"来源页面：{record.get('referer') or '-'}",
        f"IP：{record.get('ip') or '-'}",
        "",
    ]
    for key, label, _ in FIELDS:
        lines.append(f"{label}：{record['fields'].get(key) or '-'}")
    lines.extend([
        "",
        "提示：如果需要更快沟通，可让客户继续添加个人微信并备注“预约沟通”。",
    ])
    message.set_content("\n".join(lines))

    subprocess.run(
        [SENDMAIL, "-t", "-oi"],
        input=message.as_bytes(),
        check=True,
        timeout=10,
    )
    return True


class ConsultationHandler(BaseHTTPRequestHandler):
    server_version = "DongyanConsultation/1.0"

    def log_message(self, fmt, *args):
        return

    def do_GET(self):
        if self.path == "/healthz":
            json_response(self, 200, {"ok": True})
            return
        json_response(self, 404, {"ok": False, "message": "Not found"})

    def do_POST(self):
        if self.path not in ("/api/consultation", "/consultation"):
            json_response(self, 404, {"ok": False, "message": "Not found"})
            return

        try:
            length = int(self.headers.get("Content-Length", "0"))
        except ValueError:
            length = 0
        if length <= 0 or length > MAX_BODY_BYTES:
            json_response(self, 413, {"ok": False, "message": "提交内容过大或为空"})
            return

        try:
            payload = json.loads(self.rfile.read(length).decode("utf-8"))
        except (UnicodeDecodeError, json.JSONDecodeError):
            json_response(self, 400, {"ok": False, "message": "提交格式不正确"})
            return

        if clean_value(payload.get("website", ""), 200):
            json_response(self, 200, {"ok": True})
            return

        fields = {key: clean_value(payload.get(key, ""), limit) for key, _, limit in FIELDS}
        if not fields["name"] or not fields["wechat"] or not fields["problem"]:
            json_response(self, 400, {"ok": False, "message": "请填写称呼、微信和主要问题"})
            return

        record = {
            "createdAt": time.strftime("%Y-%m-%d %H:%M:%S %z"),
            "fields": fields,
            "ip": self.headers.get("X-Forwarded-For", self.client_address[0]).split(",")[0].strip(),
            "userAgent": self.headers.get("User-Agent", ""),
            "referer": self.headers.get("Referer", ""),
        }
        try:
            append_record(record)
        except OSError:
            json_response(self, 500, {"ok": False, "message": "预约信息暂时无法保存"})
            return

        mail_sent = False
        mail_error = ""
        try:
            mail_sent = send_email(record)
        except Exception as exc:
            mail_error = str(exc)
            record["mailError"] = mail_error
            try:
                append_record({"createdAt": record["createdAt"], "mailError": mail_error})
            except OSError:
                pass

        json_response(self, 200, {"ok": True, "mailSent": mail_sent})


def main():
    httpd = ThreadingHTTPServer((HOST, PORT), ConsultationHandler)
    httpd.serve_forever()


if __name__ == "__main__":
    main()
