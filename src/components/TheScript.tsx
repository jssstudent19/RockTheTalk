'use client';
import styles from './TheScript.module.css';

const meetingSteps = [
  { step: '01', title: 'Call to Order & Welcome', desc: 'The Sergeant-at-Arms calls the meeting to order, welcomes the attendees, and explains the ground rules.', role: 'Sergeant at Arms' },
  { step: '02', title: 'Theme & Meeting Overview', desc: "The Toastmaster of the Day introduces the meeting's theme and General Evaluator introduces the Tag Team to briefly explain their roles.", role: 'Toastmaster of the Day' },
  { step: '03', title: 'Prepared Speech Session', desc: "The Speech Evaluator explains the speech's purpose, followed immediately by the speaker delivering their prepared speech.", role: 'Speaker + Evaluator' },
  { step: '04', title: 'Table Topics Session', desc: 'The Table Topics Master invites participants to practice impromptu speaking by delivering short speeches on random topics.', role: 'Table Topics Master' },
  { step: '05', title: 'Evaluation Session', desc: 'The General Evaluator leads the feedback segment by collecting speech evaluations and Tag Team reports, culminating in an overall assessment.', role: 'General Evaluator' },
  { step: '06', title: 'Adjournment', desc: 'The Presiding Officer returns to the stage to share final closing thoughts, make announcements, and officially adjourn the meeting.', role: 'Presiding Officer' },
];

export default function TheScript() {
  return (
    <section className={styles.section} id="the-script" aria-label="The Script – How We Meet">
      {/* Background Effects Removed */}
      
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.actBadge}>Act IV</div>
          <div className="accent-line accent-line--center" />
          <h2 className={`headline-lg ${styles.heading}`}>
            The <span className={styles.headingAccent}>Script</span>
          </h2>
          <p className={`body-lg ${styles.subhead}`}>
            Every Thursday, our meeting follows a carefully crafted arc — six acts, one powerful experience.
          </p>
        </div>

        {/* Meeting Timeline */}
        <div className={styles.timeline}>
          {/* Start Marker */}
          <div className={styles.timelineMarkerStart}>
            <div className={styles.markerFlag}>START</div>
            <div className={styles.markerClock}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span>12:30 PM</span>
            </div>
          </div>
          {meetingSteps.map((step, i) => (
            <div key={step.step} className={`${styles.timelineItem} ${i % 2 === 1 ? styles.right : ''} reveal`} style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className={styles.timelineStep}>
                <div className={styles.stepNum}>{step.step}</div>
              </div>
              <div className={styles.timelineConnector} aria-hidden="true">
                <div className={styles.connectorLine} />
                <div className={styles.connectorDot} />
              </div>
              <div className={styles.timelineCard}>
                <div className={styles.cardRole}>{step.role}</div>
                <h3 className={`headline-sm ${styles.cardTitle}`}>{step.title}</h3>
                <p className={styles.cardDesc}>{step.desc}</p>
              </div>
            </div>
          ))}
          {/* End Marker */}
          <div className={styles.timelineMarkerEnd}>
            <div className={styles.markerFlag}>END</div>
            <div className={styles.markerClock}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span>2:00 PM</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
