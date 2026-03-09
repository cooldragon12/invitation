import { memo, useState, useEffect } from 'react';
import { generateEmailContent, sendEmail } from '@/services/emailService';
import { AnswerType } from '@/@types/card.types';

interface Activity {
  id: number;
  name: string;
}

type EmailFlowProps = {
  answer: AnswerType;
  selectedActivities: number[];
  activities: Activity[];
};

const EmailFlow = memo(({ answer, selectedActivities, activities }: EmailFlowProps) => {
  const [email, setEmail] = useState('johndelencabo@gmail.com');
  const [loading, setLoading] = useState(false);
  const [emailContent, setEmailContent] = useState<{
    subject: string;
    body: string;
  } | null>(null);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedActivityNames = activities
    .filter((a) => selectedActivities.includes(a.id))
    .map((a) => a.name);

  // Auto-send email when component mounts
  useEffect(() => {
    const autoSendEmail = async () => {
      setLoading(true);
      setError(null);

      try {
        // Generate email content using AI
        const content = await generateEmailContent(answer, selectedActivityNames);
        setEmailContent(content);

        // Send the email
        const result = await sendEmail({
          to: email,
          from: 'johndelencabo@gmail.com',
          subject: content.subject,
          body: content.body,
          recipientName: 'Kyleen Ysabelle',
          activities: selectedActivityNames,
          answer: answer,
        });

        if (result.success) {
          setSent(true);
        } else {
          setError(result.error || 'Failed to send email');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    const checkIfAlReadySent = async () => {
      // Check if email was already sent in this session (e.g., using localStorage)
      const alreadySent = localStorage.getItem('emailSent');
      if (!alreadySent) {
        await autoSendEmail();
        localStorage.setItem('emailSent', 'true');
      }
    };
    checkIfAlReadySent();
  }, []);

  const handleGenerateAndSend = async () => {
    if (!email) {
      setError('Please enter an email address');
      return;
    }

    setLoading(true);
    setError(null);
    setSent(false);

    try {
      // Generate email content using AI
      const content = await generateEmailContent(answer, selectedActivityNames);
      setEmailContent(content);

      // Send the email
      const result = await sendEmail({
        to: email,
        from: 'johndelencabo@gmail.com',
        subject: content.subject,
        body: content.body,
        recipientName: 'Kyleen Ysabelle',
        activities: selectedActivityNames,
        answer: answer,
      });

      if (result.success) {
        setSent(true);
      } else {
        setError(result.error || 'Failed to send email');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center px-6 py-8 animate-fadeIn">
        <div className="bg-green-50 rounded-2xl p-8 text-center w-full max-w-md">
          <div className="text-6xl mb-4 animate-bounce">✅</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">Email sent! 💌</h3>
          <p className="text-gray-600 mb-6">
            Your message has been sent to <span className="font-semibold">{email}</span>
          </p>
          <p className="text-sm text-gray-500">
            She'll receive your personalized message with all the details!
          </p>
          <button
            onClick={() => {
              setSent(false);
              setEmailContent(null);
            }}
            className="mt-6 text-pink-500 hover:text-pink-600 font-semibold transition-colors"
          >
            Send to another email →
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center px-6 py-8">
        <div className="text-center">
          <div className="inline-block">
            <div className="animate-spin text-5xl mb-4">✨</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Preparing your message...</h3>
            <p className="text-gray-600">Generating a personalized email with AI</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center px-4 py-6 animate-fadeIn">
      <div className="bg-gray-50 rounded-2xl p-6 space-y-4 w-full max-w-md">
        <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
          Send to a Different Email? 💌
        </h3>

        {emailContent && (
          <div className="bg-white rounded-lg p-4 mb-4 border border-pink-200 max-h-40 overflow-y-auto">
            <p className="text-xs font-bold text-gray-600 mb-2">Generated Message:</p>
            <p className="text-xs text-gray-700 whitespace-pre-wrap">{emailContent.body}</p>
          </div>
        )}

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border-2 border-pink-300 focus:border-pink-400 focus:outline-none text-gray-700"
          disabled={loading}
        />

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <button
          onClick={handleGenerateAndSend}
          disabled={!email || loading}
          className="w-full bg-linear-to-r from-pink-400 to-rose-400 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Sending...' : 'Resend Email 📧'}
        </button>

        <p className="text-sm text-gray-500 text-center">
          Your personalized message has already been sent! Change email to resend.
        </p>
      </div>
    </div>
  );
});

EmailFlow.displayName = 'EmailFlow';
export default EmailFlow;
