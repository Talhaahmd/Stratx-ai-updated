"use client";

import React, { useState } from "react";
import { supabase } from "@/utils/supabaseClient";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg(null);
    setErrorMsg(null);

    if (!name || !email || !message) {
      setErrorMsg("Please fill in your name, email and message.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("contact_messages").insert([
      {
        name,
        email,
        subject: subject || null,
        message,
      },
    ]);

    setLoading(false);

    if (error) {
      console.error("Error saving contact message:", error.message);
      setErrorMsg("Something went wrong. Please try again.");
      return;
    }

    // clear form + show success
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    setSuccessMsg("Thanks for reaching out. We'll get back to you soon.");
  };

  return (
    <form className="cn-contactform" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-6">
          <div className="cn-contactform-input">
            <label htmlFor="name">Name*</label>
            <input
              id="name"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="cn-contactform-input">
            <label htmlFor="email">Email*</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="col-md-12">
          <div className="cn-contactform-input">
            <label htmlFor="subject">Subject</label>
            <input
              id="subject"
              type="text"
              placeholder="How can we help?"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
        </div>

        <div className="col-md-12">
          <div className="cn-contactform-input">
            <label htmlFor="message">Message*</label>
            <textarea
              id="message"
              placeholder="Write your message here..."
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="col-md-12">
          <button
            type="submit"
            className="tp-btn tp-btn-border tp-btn-radius"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </div>

        {successMsg && (
          <div className="col-md-12 mt-3">
            <p style={{ color: "green" }}>{successMsg}</p>
          </div>
        )}
        {errorMsg && (
          <div className="col-md-12 mt-3">
            <p style={{ color: "red" }}>{errorMsg}</p>
          </div>
        )}
      </div>
    </form>
  );
}
