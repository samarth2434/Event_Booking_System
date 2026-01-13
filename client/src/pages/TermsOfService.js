import React from 'react';
import { FileText, Users, CreditCard, Shield, AlertCircle, CheckCircle } from 'lucide-react';

const TermsOfService = () => {
  const sections = [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      icon: CheckCircle,
      content: [
        {
          text: 'By accessing and using EventHub, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.'
        },
        {
          text: 'These Terms of Service constitute a legally binding agreement between you and EventHub regarding your use of our platform and services.'
        }
      ]
    },
    {
      id: 'user-accounts',
      title: 'User Accounts',
      icon: Users,
      content: [
        {
          subtitle: 'Account Creation',
          text: 'To access certain features of our service, you must create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.'
        },
        {
          subtitle: 'Account Responsibilities',
          text: 'You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate, current, and complete.'
        },
        {
          subtitle: 'Account Termination',
          text: 'We reserve the right to terminate or suspend your account at any time for violations of these terms or for any other reason at our sole discretion.'
        }
      ]
    },
    {
      id: 'booking-terms',
      title: 'Booking and Payment Terms',
      icon: CreditCard,
      content: [
        {
          subtitle: 'Ticket Purchases',
          text: 'All ticket purchases are subject to availability and confirmation. Prices are subject to change without notice until payment is completed.'
        },
        {
          subtitle: 'Payment Processing',
          text: 'Payments are processed securely through our payment partners. You agree to provide valid payment information and authorize us to charge your payment method.'
        },
        {
          subtitle: 'Refunds and Cancellations',
          text: 'Refund policies vary by event and are determined by the event organizer. Please review the specific refund policy for each event before purchasing.'
        }
      ]
    },
    {
      id: 'user-conduct',
      title: 'User Conduct',
      icon: Shield,
      content: [
        {
          subtitle: 'Prohibited Activities',
          text: 'You agree not to use our service for any unlawful purpose or in any way that could damage, disable, overburden, or impair our service.'
        },
        {
          subtitle: 'Content Guidelines',
          text: 'Any content you submit must be accurate, lawful, and not infringe on the rights of others. We reserve the right to remove any content that violates these terms.'
        },
        {
          subtitle: 'Compliance',
          text: 'You agree to comply with all applicable laws and regulations when using our service and attending events booked through our platform.'
        }
      ]
    }
  ];

  const prohibitedActivities = [
    'Using the service for any illegal or unauthorized purpose',
    'Attempting to gain unauthorized access to our systems',
    'Interfering with or disrupting the service or servers',
    'Transmitting viruses, malware, or other harmful code',
    'Impersonating another person or entity',
    'Collecting user information without consent',
    'Engaging in fraudulent activities or transactions',
    'Violating intellectual property rights'
  ];

  const limitations = [
    'Service availability and uptime',
    'Accuracy of event information provided by organizers',
    'Actions or conduct of event organizers or other users',
    'Technical issues or system failures',
    'Third-party payment processing',
    'Event cancellations or changes by organizers'
  ];

  return (
    <div style={{ 
      padding: '60px 0', 
      minHeight: 'calc(100vh - 140px)',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
    }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }} className="fade-in">
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '8px 20px',
            borderRadius: '50px',
            marginBottom: '24px',
            fontSize: '14px',
            fontWeight: '600'
          }}>
            <FileText size={16} />
            Terms of Service
          </div>
          
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: '800',
            marginBottom: '16px',
            color: '#2d3748',
            lineHeight: '1.2'
          }}>
            Terms of
            <span className="gradient-text"> Service</span>
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            color: '#718096',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Please read these terms carefully before using our event booking platform.
          </p>
          <p style={{ 
            fontSize: '1rem', 
            color: '#718096',
            marginTop: '16px'
          }}>
            Last updated: January 13, 2026
          </p>
        </div>

        {/* Introduction */}
        <div className="card" style={{ marginBottom: '40px' }}>
          <div className="card-body" style={{ padding: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <AlertCircle size={24} color="#f6ad55" />
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', margin: 0, color: '#2d3748' }}>
                Agreement Overview
              </h2>
            </div>
            <p style={{ color: '#718096', lineHeight: '1.6', marginBottom: '16px' }}>
              These Terms of Service ("Terms") govern your use of the EventHub platform and services operated by EventHub. 
              Our service provides an online platform for discovering, booking, and managing event tickets.
            </p>
            <p style={{ color: '#718096', lineHeight: '1.6' }}>
              By accessing or using our service, you agree to be bound by these Terms. If you disagree with any part 
              of these terms, then you may not access the service.
            </p>
          </div>
        </div>

        {/* Main Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginBottom: '40px' }}>
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <div key={section.id} className="card">
                <div className="card-body" style={{ padding: '40px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                    <Icon size={24} color="#667eea" />
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '600', margin: 0, color: '#2d3748' }}>
                      {section.title}
                    </h2>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {section.content.map((item, index) => (
                      <div key={index}>
                        {item.subtitle && (
                          <h3 style={{
                            fontSize: '1.125rem',
                            fontWeight: '600',
                            marginBottom: '8px',
                            color: '#2d3748'
                          }}>
                            {item.subtitle}
                          </h3>
                        )}
                        <p style={{
                          color: '#718096',
                          lineHeight: '1.6',
                          margin: 0
                        }}>
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-2" style={{ gap: '32px', marginBottom: '40px' }}>
          {/* Prohibited Activities */}
          <div className="card">
            <div className="card-header">
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', margin: 0, color: '#2d3748' }}>
                Prohibited Activities
              </h2>
            </div>
            <div className="card-body">
              <p style={{ color: '#718096', marginBottom: '20px', lineHeight: '1.6' }}>
                The following activities are strictly prohibited when using our service:
              </p>
              <ul style={{ 
                listStyle: 'none', 
                padding: 0, 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '12px' 
              }}>
                {prohibitedActivities.map((activity, index) => (
                  <li key={index} style={{ 
                    display: 'flex', 
                    alignItems: 'flex-start', 
                    gap: '8px',
                    color: '#718096'
                  }}>
                    <div style={{
                      width: '6px',
                      height: '6px',
                      background: '#e53e3e',
                      borderRadius: '50%',
                      marginTop: '8px',
                      flexShrink: 0
                    }}></div>
                    {activity}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Limitations of Liability */}
          <div className="card">
            <div className="card-header">
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', margin: 0, color: '#2d3748' }}>
                Limitations of Liability
              </h2>
            </div>
            <div className="card-body">
              <p style={{ color: '#718096', marginBottom: '20px', lineHeight: '1.6' }}>
                EventHub is not liable for the following:
              </p>
              <ul style={{ 
                listStyle: 'none', 
                padding: 0, 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '12px' 
              }}>
                {limitations.map((limitation, index) => (
                  <li key={index} style={{ 
                    display: 'flex', 
                    alignItems: 'flex-start', 
                    gap: '8px',
                    color: '#718096'
                  }}>
                    <div style={{
                      width: '6px',
                      height: '6px',
                      background: '#f6ad55',
                      borderRadius: '50%',
                      marginTop: '8px',
                      flexShrink: 0
                    }}></div>
                    {limitation}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Additional Terms */}
        <div className="grid grid-cols-2" style={{ gap: '32px' }}>
          {/* Intellectual Property */}
          <div className="card">
            <div className="card-header">
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', margin: 0, color: '#2d3748' }}>
                Intellectual Property
              </h2>
            </div>
            <div className="card-body">
              <p style={{ color: '#718096', marginBottom: '16px', lineHeight: '1.6' }}>
                The service and its original content, features, and functionality are and will remain the exclusive 
                property of EventHub and its licensors.
              </p>
              <p style={{ color: '#718096', lineHeight: '1.6' }}>
                The service is protected by copyright, trademark, and other laws. Our trademarks and trade dress 
                may not be used in connection with any product or service without our prior written consent.
              </p>
            </div>
          </div>

          {/* Governing Law */}
          <div className="card">
            <div className="card-header">
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', margin: 0, color: '#2d3748' }}>
                Governing Law
              </h2>
            </div>
            <div className="card-body">
              <p style={{ color: '#718096', marginBottom: '16px', lineHeight: '1.6' }}>
                These Terms shall be interpreted and governed by the laws of India, without regard to its 
                conflict of law provisions.
              </p>
              <p style={{ color: '#718096', lineHeight: '1.6' }}>
                Our failure to enforce any right or provision of these Terms will not be considered a waiver 
                of those rights.
              </p>
            </div>
          </div>
        </div>

        {/* Contact and Changes */}
        <div className="card" style={{ marginTop: '32px' }}>
          <div className="card-body" style={{ padding: '40px' }}>
            <div className="grid grid-cols-2" style={{ gap: '40px' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '16px', color: '#2d3748' }}>
                  Changes to Terms
                </h3>
                <p style={{ color: '#718096', lineHeight: '1.6' }}>
                  We reserve the right to modify or replace these Terms at any time. If a revision is material, 
                  we will try to provide at least 30 days notice prior to any new terms taking effect.
                </p>
              </div>
              
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '16px', color: '#2d3748' }}>
                  Contact Information
                </h3>
                <p style={{ color: '#718096', marginBottom: '12px' }}>
                  If you have any questions about these Terms, please contact us:
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <p style={{ color: '#667eea', margin: 0 }}>gsamarth2004@gmail.com</p>
                  <p style={{ color: '#718096', margin: 0 }}>+91 9098860093</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;