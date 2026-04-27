"use client";

import { contact, mailchimp } from "@/resources";
import {
  Button,
  Heading,
  Input,
  Text,
  Background,
  Column,
  Row,
} from "@once-ui-system/core";
import { opacity, SpacingToken } from "@once-ui-system/core";
import { useState } from "react";

export const Mailchimp: React.FC<React.ComponentProps<typeof Column>> = ({
  ...flex
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [emailError, setEmailError] = useState("");
  const [formError, setFormError] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [successMessage, setSuccessMessage] = useState("");

  const validateEmail = (value: string): boolean => {
    if (value === "") return true;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setEmailError("");

    if (!name.trim()) {
      setFormError("Please enter your name.");
      return;
    }
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    if (!description.trim()) {
      setFormError("Please enter a description.");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          description: description.trim(),
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        message?: string;
      };

      if (!res.ok) {
        setFormError(
          typeof data.error === "string" ? data.error : "Something went wrong.",
        );
        setStatus("error");
        return;
      }

      setSuccessMessage(
        typeof data.message === "string"
          ? data.message
          : "Your message was sent.",
      );
      setName("");
      setEmail("");
      setDescription("");
      setStatus("success");
    } catch {
      setFormError("Network error. Please try again.");
      setStatus("error");
    }
  };

  if (contact.display === false) return null;

  return (
    <Column
      overflow="hidden"
      fillWidth
      padding="xl"
      radius="l"
      marginBottom="m"
      horizontal="center"
      align="center"
      background="surface"
      border="neutral-alpha-weak"
      {...flex}
    >
      <Background
        top="0"
        position="absolute"
        mask={{
          x: mailchimp.effects.mask.x,
          y: mailchimp.effects.mask.y,
          radius: mailchimp.effects.mask.radius,
          cursor: mailchimp.effects.mask.cursor,
        }}
        gradient={{
          display: mailchimp.effects.gradient.display,
          opacity: mailchimp.effects.gradient.opacity as opacity,
          x: mailchimp.effects.gradient.x,
          y: mailchimp.effects.gradient.y,
          width: mailchimp.effects.gradient.width,
          height: mailchimp.effects.gradient.height,
          tilt: mailchimp.effects.gradient.tilt,
          colorStart: mailchimp.effects.gradient.colorStart,
          colorEnd: mailchimp.effects.gradient.colorEnd,
        }}
        dots={{
          display: mailchimp.effects.dots.display,
          opacity: mailchimp.effects.dots.opacity as opacity,
          size: mailchimp.effects.dots.size as SpacingToken,
          color: mailchimp.effects.dots.color,
        }}
        grid={{
          display: mailchimp.effects.grid.display,
          opacity: mailchimp.effects.grid.opacity as opacity,
          color: mailchimp.effects.grid.color,
          width: mailchimp.effects.grid.width,
          height: mailchimp.effects.grid.height,
        }}
        lines={{
          display: mailchimp.effects.lines.display,
          opacity: mailchimp.effects.lines.opacity as opacity,
          size: mailchimp.effects.lines.size as SpacingToken,
          thickness: mailchimp.effects.lines.thickness,
          angle: mailchimp.effects.lines.angle,
          color: mailchimp.effects.lines.color,
        }}
      />
      <Column maxWidth="xs" horizontal="center">
        <Heading marginBottom="s" variant="display-strong-xs">
          {contact.title}
        </Heading>
        <Text
          wrap="balance"
          marginBottom="l"
          variant="body-default-l"
          onBackground="neutral-weak"
        >
          {contact.description}
        </Text>
      </Column>
      <form
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <Column fillWidth maxWidth={24} gap="8">
          <Input
            id="contact-name"
            name="name"
            type="text"
            placeholder={contact.labels.name}
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            id="contact-email"
            name="email"
            type="email"
            placeholder={contact.labels.email}
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) setEmailError("");
            }}
            onBlur={() => {
              if (email && !validateEmail(email)) {
                setEmailError("Please enter a valid email address.");
              }
            }}
            errorMessage={emailError}
            required
          />
          <Column gap="4" fillWidth>
            <textarea
              id="contact-description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={contact.labels.description}
              required
              rows={5}
              style={{
                width: "100%",
                resize: "vertical",
                padding: "var(--static-space-12)",
                borderRadius: "var(--radius-m)",
                border: "1px solid var(--neutral-alpha-medium)",
                background: "var(--page-background)",
                color: "var(--neutral-on-background-strong)",
                fontFamily: "inherit",
                fontSize: "var(--font-size-body-default)",
                lineHeight: 1.5,
              }}
            />
          </Column>
          {formError ? (
            <Text variant="body-default-s" onBackground="danger-strong">
              {formError}
            </Text>
          ) : null}
          {status === "success" ? (
            <Text variant="body-default-s" onBackground="brand-medium">
              {successMessage}
            </Text>
          ) : null}
          <Row height="48" vertical="center">
            <Button
              type="submit"
              size="m"
              fillWidth
              disabled={status === "loading"}
            >
              {status === "loading" ? "Sending…" : contact.submit}
            </Button>
          </Row>
        </Column>
      </form>
    </Column>
  );
};
