"use client";

import { useForm } from "@formspree/react";

const FORMSPREE_FORM_ID = "mqpenzan";

type ContactFormValues = {
  name: string;
  email: string;
  type: string;
  message: string;
};

export default function ContactForm() {
  const [state, handleSubmit] = useForm<ContactFormValues>(FORMSPREE_FORM_ID);

  if (state.succeeded) {
    return (
      <div className="contact-success" role="status">
        <p className="contact-success-title"><span className="status-dot" aria-hidden="true" />送信しました</p>
        <p>お問い合わせいただき、ありがとうございます。内容を確認のうえ、ご連絡いたします。</p>
      </div>
    );
  }

  return (
    <form className="contact-form-body" onSubmit={handleSubmit}>
      <p className="contact-form-notice">
        <span className="status-dot" aria-hidden="true" />
        ご入力いただいた内容は、お問い合わせへの対応以外の目的には使用しません。送信にはフォーム送信サービス「Formspree」を利用しています。
      </p>

      {state.errors && (
        <p className="contact-error" role="alert">
          送信に失敗しました。通信状況をご確認のうえ、もう一度お試しください。
        </p>
      )}

      <div className="form-field">
        <label htmlFor="contact-name">お名前・会社名</label>
        <input id="contact-name" name="name" type="text" autoComplete="off" required placeholder="例）山田 太郎 / 株式会社〇〇" />
      </div>
      <div className="form-field">
        <label htmlFor="contact-email">メールアドレス</label>
        <input id="contact-email" name="email" type="email" autoComplete="off" required placeholder="example@example.com" />
      </div>
      <div className="form-field">
        <label htmlFor="contact-type">お問い合わせの種類</label>
        <select id="contact-type" name="type" required defaultValue="">
          <option value="" disabled>選択してください</option>
          <option value="お仕事のご相談・制作依頼">お仕事のご相談・制作依頼</option>
          <option value="ご意見・ご感想">ご意見・ご感想</option>
          <option value="その他">その他</option>
        </select>
      </div>
      <div className="form-field">
        <label htmlFor="contact-message">お問い合わせ内容</label>
        <textarea id="contact-message" name="message" rows={5} required placeholder="お問い合わせ内容をご記入ください"></textarea>
      </div>

      <button type="submit" className="button button-lime contact-submit" disabled={state.submitting}>
        {state.submitting ? "送信中…" : "送信する"}
      </button>
    </form>
  );
}
