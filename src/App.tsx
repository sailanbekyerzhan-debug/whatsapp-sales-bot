import React, { useState } from 'react';

const App: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const send = async () => {
    setStatus('Sending...');
    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, message }),
      });
      const data = await res.json();
      if (res.ok) setStatus('Sent: ' + data.result);
      else setStatus('Error: ' + (data.error || res.statusText));
    } catch (err: any) {
      setStatus('Error: ' + err.message);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1>WhatsApp Sales Bot</h1>
      <div style={{ marginBottom: 8 }}>
        <label style={{ display: 'block', marginBottom: 4 }}>Phone</label>
        <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+1234567890" style={{ width: '100%', padding: 8 }} />
      </div>
      <div style={{ marginBottom: 8 }}>
        <label style={{ display: 'block', marginBottom: 4 }}>Message</label>
        <textarea value={message} onChange={e => setMessage(e.target.value)} rows={6} style={{ width: '100%', padding: 8 }} />
      </div>
      <button onClick={send} style={{ padding: '8px 16px' }}>Send</button>
      <div style={{ marginTop: 12 }}>{status}</div>
    </div>
  );
};

export default App;