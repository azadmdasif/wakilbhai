import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useWeb3Forms } from '../hooks/useWeb3Forms';
import { TEXTS } from '../constants';
import { PhoneIcon } from '../components/Icons';

const TalkToLawyerPage: React.FC = () => {
  const { language } = useLanguage();
  const T = TEXTS[language].ask;
  const T_contact = TEXTS[language].contact;

  const { submit, isSubmitting, result } = useWeb3Forms({
    access_key: 'b9f95d5b-8f90-477b-a068-55293c654708',
  });

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white font-display">{T.title}</h1>
        <p className="mt-4 text-lg text-gray-300 max-w-4xl mx-auto">{T.subtitle}</p>
      </section>

      <div className="grid lg:grid-cols-2 lg:gap-16 items-start">
        {/* Left Side: Instant Call */}
        <div className="bg-gray-900 rounded-2xl p-8 shadow-lg text-center flex flex-col justify-center items-center h-full mb-8 lg:mb-0">
             <div className="flex justify-center mb-6">
                <PhoneIcon className="w-16 h-16 text-brand-gold" />
            </div>
            <h2 className="text-3xl font-bold text-white font-display">{T.instantConsultationTitle}</h2>
            <p className="text-gray-300 mt-4 mb-8">{T.instantConsultationDesc}</p>
            <a href={`tel:${T_contact.phoneNo.replace(/-/g, '')}`} className="w-full max-w-xs bg-green-600 text-white font-bold py-4 rounded-full hover:bg-green-700 transition-colors flex items-center justify-center text-xl transform hover:scale-105">
                 <PhoneIcon className="w-6 h-6 mr-3" />
                 {T.callButtonText}
            </a>
        </div>

        {/* Right Side: Form for Physical Meeting */}
        <div className="bg-gray-900 rounded-2xl p-8 md:p-10 shadow-lg">
            <h2 className="text-3xl font-bold text-white text-center mb-2 font-display">{T.physicalMeetingTitle}</h2>
            <p className="text-gray-400 text-center mb-6">{T.physicalMeetingDesc}</p>
            <form onSubmit={submit} className="space-y-6">
              <input type="hidden" name="from_site" value="WakilBhai Physical Meeting Request" />
            
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">{T.name} <span className="text-brand-red">*</span></label>
                <input id="name" type="text" name="name" required className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-red focus:outline-none" />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">{T.email} <span className="text-brand-red">*</span></label>
                <input id="email" type="email" name="email" required className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-red focus:outline-none" />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">{T.phone} <span className="text-brand-red">*</span></label>
                <input id="phone" type="tel" name="phone" required className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-red focus:outline-none" />
              </div>

              <div>
                <label htmlFor="legal-issue" className="block text-sm font-medium text-gray-300 mb-1">{T.legalIssue} <span className="text-brand-red">*</span></label>
                <select 
                  id="legal-issue" 
                  name="legal_issue" 
                  required 
                  defaultValue=""
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-red focus:outline-none"
                >
                  <option value="" disabled>{T.selectDefault}</option>
                  {T.legalIssuesList.map(issue => (
                      <option key={issue.value} value={issue.label}>{issue.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="issue-description" className="block text-sm font-medium text-gray-300 mb-1">{T.issueDescription}</label>
                <textarea id="issue-description" name="issue_description" rows={4} className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-red focus:outline-none"></textarea>
              </div>
            
              <button type="submit" disabled={isSubmitting} className="w-full bg-brand-red text-white font-bold py-3 rounded-full hover:bg-red-700 transition-colors disabled:bg-gray-600">
                {isSubmitting ? T.sending : T.send}
              </button>
            </form>
            {result && (
              <div className={`mt-4 text-center p-3 rounded-lg ${result.success ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'}`}>
                  {result.success ? T.success : T.error}
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default TalkToLawyerPage;