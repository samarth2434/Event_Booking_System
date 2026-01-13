import React from 'react';
import { Shield, Eye, Lock, Database, UserCheck, AlertTriangle } from 'lucide-react';

const PrivacyPolicy = () => {
  const sections = [
    {
      id: 'information-collection',
      title: 'Information We Collect',
      icon: Database,
      content: [
        {
          subtitle: 'Personal Information',
          text: 'We collect information you provide directly to us, such as when you create an account, book tickets, or contact us. This includes your name, email address, phone number, and payment information.'
        },
        {
          subtitle: 'Usage Information',
          text: 'We automatically collect information about your use of our services, including your IP address, browser type, device information, and pages visited.'
        },
        {
          subtitle: 'Event Information',
          text: 'When you attend events, we may collect information about your participation and preferences to improve our services.'
        }
      ]
    },
    {
      id: 'information-use',
      title: 'How We Use Your Information',
      icon: UserCheck,
      content: [
        {
          subtitle: 'Service Provision',
          text: 'We use your information to provide, maintain, and improve our event booking services, process transactions, and communicate with you.'
        },
        {
          subtitle: 'Personalization',
          text: 'We may use your information to personalize your experience, recommend events, and provide targeted content.'
        },
        {
          subtitle: 'Communication',
          text: 'We use your contact information to send you service-related communications, updates, and promotional materials (with your consent).'
        }
      ]
    },
    {
      id: 'information-sharing',
      title: 'Information Sharing',
      icon: Eye,
      content: [
        {
          subtitle: 'Event Organizers',
          text: 'We share necessary information with event organizers to facilitate your attendance and improve event experiences.'
        },
        {
          subtitle: 'Service Providers',
          text: 'We may share information with third-party service providers who assist us in operating our platform and providing services.'
        },
        {
          subtitle: 'Legal Requirements',
          text: 'We may disclose information when required by law or to protect our rights, safety, or the rights and safety of others.'
        }
      ]
    },
    {
      id: 'data-security',
      title: 'Data Security',
      icon: Lock,
      content: [
        {
          subtitle: 'Security Measures',
          text: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.'
        },
        {
          subtitle: 'Payment Security',
          text: 'All payment information is processed securely using industry-standard encryption and is handled by certified payment processors.'
        },
        {
          subtitle: 'Data Retention',
          text: 'We retain your information only as long as necessary to provide services and comply with legal obligations.'
        }
      ]
    }
  ];

  const rights = [
    'Access and review your personal information',
    'Correct inaccurate or incomplete information',
    'Delete your personal information (subject to legal requirements)',
    'Restrict or object to certain processing of your information',
    'Data portability for information you provided',
    'Withdraw consent for marketing communications'
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
            <Shield size={16} />
            Privacy Policy
          </div>
          
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: '800',
            marginBottom: '16px',
            color: '#2d3748',
            lineHeight: '1.2'
          }}>
            Your Privacy
            <span className="gradient-text"> Matters</span>
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            color: '#718096',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            We are committed to protecting your privacy and ensuring the security of your personal information.
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
              <AlertTriangle size={24} color="#f6ad55" />
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', margin: 0, color: '#2d3748' }}>
                Introduction
              </h2>
            </div>
            <p style={{ color: '#718096', lineHeight: '1.6', marginBottom: '16px' }}>
              EventHub ("we," "our," or "us") respects your privacy and is committed to protecting your personal information. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our 
              event booking platform and services.
            </p>
            <p style={{ color: '#718096', lineHeight: '1.6' }}>
              By using our services, you agree to the collection and use of information in accordance with this policy. 
              If you do not agree with our policies and practices, please do not use our services.
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
                        <h3 style={{
                          fontSize: '1.125rem',
                          fontWeight: '600',
                          marginBottom: '8px',
                          color: '#2d3748'
                        }}>
                          {item.subtitle}
                        </h3>
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

        <div className="grid grid-cols-2" style={{ gap: '32px' }}>
          {/* Your Rights */}
          <div className="card">
            <div className="card-header">
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', margin: 0, color: '#2d3748' }}>
                Your Rights
              </h2>
            </div>
            <div className="card-body">
              <p style={{ color: '#718096', marginBottom: '20px', lineHeight: '1.6' }}>
                You have the following rights regarding your personal information:
              </p>
              <ul style={{ 
                listStyle: 'none', 
                padding: 0, 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '12px' 
              }}>
                {rights.map((right, index) => (
                  <li key={index} style={{ 
                    display: 'flex', 
                    alignItems: 'flex-start', 
                    gap: '8px',
                    color: '#718096'
                  }}>
                    <div style={{
                      width: '6px',
                      height: '6px',
                      background: '#667eea',
                      borderRadius: '50%',
                      marginTop: '8px',
                      flexShrink: 0
                    }}></div>
                    {right}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Information */}
          <div className="card">
            <div className="card-header">
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', margin: 0, color: '#2d3748' }}>
                Contact Us
              </h2>
            </div>
            <div className="card-body">
              <p style={{ color: '#718096', marginBottom: '20px', lineHeight: '1.6' }}>
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '4px', color: '#2d3748' }}>
                    Email
                  </h4>
                  <p style={{ color: '#667eea', margin: 0 }}>
                    gsamarth2004@gmail.com
                  </p>
                </div>
                
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '4px', color: '#2d3748' }}>
                    Phone
                  </h4>
                  <p style={{ color: '#718096', margin: 0 }}>
                    +91 9098860093
                  </p>
                </div>
                
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '4px', color: '#2d3748' }}>
                    Address
                  </h4>
                  <p style={{ color: '#718096', margin: 0, lineHeight: '1.5' }}>
                    EventHub Headquarters<br />
                    Tech Park, Sector 5<br />
                    Gurgaon, Haryana 122001<br />
                    India
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Updates Notice */}
        <div className="card" style={{ marginTop: '32px' }}>
          <div className="card-body" style={{ padding: '32px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '12px', color: '#2d3748' }}>
              Policy Updates
            </h3>
            <p style={{ color: '#718096', lineHeight: '1.6', margin: 0 }}>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
              the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to 
              review this Privacy Policy periodically for any changes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;