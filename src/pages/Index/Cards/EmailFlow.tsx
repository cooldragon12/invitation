import { memo, useEffect, useRef, useState } from 'react';

import type { Activity, AnswerType } from '@/@types/card.types';
import PillButton from '@/components/Button/PillButton';
import { generateEmailContent, sendEmail } from '@/services/emailService';

const SENT_KEY = 'emailSent';

type Status = 'sending' | 'sent' | 'error';

type EmailFlowProps = {
  answer: AnswerType;
  selectedActivities: number[];
  activities: Activity[];
};

const EmailFlow = memo(({ answer, selectedActivities, activities }: EmailFlowProps) => {
  const [email, setEmail] = useState('kyleenobmerga67@gmail.com'); // default email for testing
  // Only send once per browser, even if the card is shown again
  const [status, setStatus] = useState<Status>(() =>
    localStorage.getItem(SENT_KEY) ? 'sent' : 'sending'
  );
  const [error, setError] = useState<string | null>(null);
  const autoSent = useRef(false);

  const chosen = activities.filter((a) => selectedActivities.includes(a.id));

  const send = async (to: string) => {
    setStatus('sending');
    setError(null);

    try {
      // Generate email content using AI
      const names = chosen.map((a) => a.name);
      const content = await generateEmailContent(answer, names);

      const result = await sendEmail({
        to,
        from: 'johndelencabo@gmail.com',
        subject: content.subject,
        body: content.body,
        recipientName: 'Kyleen Ysabelle',
        activities: names,
        answer: answer,
      });

      if (result.success) {
        localStorage.setItem(SENT_KEY, 'true');
        setStatus('sent');
      } else {
        setError(result.error || 'Failed to send email');
        setStatus('error');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setStatus('error');
    }
  };

  // Auto-send email when component mounts
  useEffect(() => {
    if (status === 'sending' && !autoSent.current) {
      autoSent.current = true;
      void send(email);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (status === 'sending') {
    return (
      <div className="flex w-full flex-col items-center justify-center px-6 pb-12 pt-2 text-center" role="status">
        <div className="mb-5 text-6xl animate-beating" aria-hidden="true">💌</div>
        <h3 className="mb-2 text-2xl font-bold text-rose-900">Preparing your message...</h3>
        <p className="text-rose-900/70">Writing a little note with everything you chose ✨</p>
      </div>
    );
  }

  if (status === 'sent') {
    return (
      <div className="flex w-full flex-col items-center justify-center px-6 pb-12 pt-2 text-center">
        <div className="mb-5 text-7xl" aria-hidden="true">💞</div>
        <h3 className="mb-3 font-script text-5xl font-bold text-rose-600">Email sent! 💌</h3>
        <p className="mb-6 max-w-md text-lg text-rose-900/75">
          {answer === 'yes'
            ? "Thank you for saying yes! I'll reach out soon with all the details 🥰"
            : 'Thank you for being honest with me. The invitation is always open 💕'}
        </p>
        {answer === 'yes' && chosen.length > 0 && (
          <ul className="flex max-w-lg flex-wrap justify-center gap-2" aria-label="Our plans">
            {chosen.map((plan) => (
              <li
                key={plan.id}
                className="rounded-full bg-pink-50 px-3 py-1 text-sm font-semibold text-rose-600 ring-1 ring-pink-200"
              >
                {plan.icon} {plan.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center justify-center px-4 pb-12 pt-2 text-center">
      <div className="mb-4 text-6xl" aria-hidden="true">💔</div>
      <h3 className="mb-2 text-2xl font-bold text-rose-900">Oops, the letter got lost</h3>
      <p className="mb-6 max-w-sm text-rose-900/70">
        Your answer didn't go through. Let's try sending it again.
      </p>

      <form
        className="w-full max-w-sm space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (email) void send(email);
        }}
      >
        <label className="block text-left text-sm font-semibold text-rose-900/70">
          Send to
          <input
            type="email"
            required
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-2xl border-2 border-pink-200 bg-white px-4 py-3 text-rose-900 focus:border-rose-400 focus:outline-none"
          />
        </label>

        {error && (
          <p className="rounded-2xl bg-rose-50 p-3 text-sm text-rose-700 ring-1 ring-rose-200" role="alert">
            {error}
          </p>
        )}

        <PillButton type="submit" disabled={!email} className="w-full">
          Try again 💌
        </PillButton>
      </form>
    </div>
  );
});

EmailFlow.displayName = 'EmailFlow';
export default EmailFlow;
