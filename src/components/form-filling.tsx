import { FormEvent, useState } from "react";

export default function FormFillingSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedName) {
      setStatus("Please enter your name.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(trimmedPhone.replace(/\s+/g, ""))) {
      setStatus("Please enter a valid 10-digit mobile number.");
      return;
    }

    setSubmitting(true);
    setStatus("");

    window.setTimeout(() => {
      setSubmitting(false);
      setStatus("Thanks — our team will call you shortly.");
      setName("");
      setPhone("");
    }, 700);
  };

  return (
    <section
      className="form-filling-section"
      id="get-in-touch"
      aria-labelledby="form-filling-heading"
    >
      <div className="form-filling-section__glow" aria-hidden="true" />

      <div className="form-filling-section__inner">
        <div className="form-filling-section__copy">
          <p className="form-filling-section__eyebrow">Talk to ILA Homes</p>
          <h2 id="form-filling-heading">
            Tell us what you’re looking for.
            <span>We’ll take it from there.</span>
          </h2>
          <p className="form-filling-section__lede">
            Share your name and number — a property advisor will reach out with
            matched homes, plots, and communities around Hyderabad.
          </p>

          <ul className="form-filling-section__points">
            <li>Personalised shortlist within 24 hours</li>
            <li>Site visits scheduled around your time</li>
            <li>No spam — only relevant opportunities</li>
          </ul>
        </div>

        <div className="form-filling-section__panel">
          <form className="form-filling-section__form" onSubmit={handleSubmit} noValidate>
            <div className="form-filling-section__form-head">
              <h3>Request a callback</h3>
              <p>Takes less than a minute</p>
            </div>

            <label className="form-filling-section__field">
              <span>Full name</span>
              <input
                type="text"
                name="name"
                autoComplete="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-label="Full name"
              />
            </label>

            <label className="form-filling-section__field">
              <span>Mobile number</span>
              <div className="form-filling-section__phone">
                <span className="form-filling-section__prefix" aria-hidden="true">
                  +91
                </span>
                <input
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  inputMode="numeric"
                  maxLength={10}
                  placeholder="10-digit number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/[^\d]/g, "").slice(0, 10))}
                  aria-label="Mobile number"
                />
              </div>
            </label>

            <button
              className="form-filling-section__submit"
              type="submit"
              disabled={submitting}
            >
              {submitting ? "Sending…" : "Get a callback"}
              {!submitting && <span aria-hidden="true">→</span>}
            </button>

            <p className="form-filling-section__fineprint">
              By continuing, you agree to be contacted by ILA Homes about property options.
            </p>

            {status && (
              <p
                className={`form-filling-section__status ${
                  status.startsWith("Thanks") ? "is-success" : "is-error"
                }`}
                role="status"
                aria-live="polite"
              >
                {status}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
