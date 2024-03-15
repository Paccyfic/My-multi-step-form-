import React, { useState } from 'react';
import './MultiStepForm.css';

interface Plan {
  name: string;
  price: string;
  
}

interface Addon {
  id: number;
  name: string;
  description: string;
  price: string;
}

const MultiStepForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<Addon[]>([]);
  const [isYearlyBilling, setIsYearlyBilling] = useState<boolean>(false);

  const plans: Plan[] = [
    { name: 'Arcade', price: '$9/mo' },
    { name: 'Advanced', price: '$12/mo' },
    { name: 'Pro', price: '$15/mo' }
  ];

  const addons: Addon[] = [
    { id: 1, name: 'Online service', description: 'Access to multiplayer games', price: '+$1/mo' },
    { id: 2, name: 'Larger storage', description: 'Extra 1TB of cloud save', price: '+$2/mo' },
    { id: 3, name: 'Customizable Profile', description: 'Custom theme on your profile', price: '+$2/mo' }
  ];

  const handleNextStep = () => {
    if (currentStep < 5 && validateForm()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handlePlanSelection = (plan: Plan) => {
    setSelectedPlan(plan);
  };

  const handleAddonSelection = (addon: Addon) => {
    const index = selectedAddons.findIndex(item => item.id === addon.id);
    if (index !== -1) {
      setSelectedAddons(selectedAddons.filter(item => item.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const validateForm = () => {
    const inputs = document.querySelectorAll('.step-1 input');
    let isValid = true;
    inputs.forEach((input) => {
      if (!(input instanceof HTMLInputElement)) return; 
      if (!input.value) {
        isValid = false;
        input.classList.add('err');
      } else {
        input.classList.remove('err');
      }
    });
    return isValid;
  };

  const toggleBillingPeriod = () => {
    setIsYearlyBilling(!isYearlyBilling);
  };

  return (
    <div className="form">
      <div className="form-container">
        {}
        {}
        <div className="form-sidebar">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className={`step ${currentStep === index + 1 ? 'active' : ''}`}>
              <div className="circle">{index + 1}</div>
              <div className="step-content">
                <span>Step {index + 1}</span>
                <b>{index === 0 ? 'Your info' : index === 1 ? 'Select plan' : index === 2 ? 'Add-ons' : 'Summary'}</b>
              </div>
            </div>
          ))}
        </div>
        {}
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className={`stp step-${index + 1}`} style={{ display: currentStep === index + 1 ? 'flex' : 'none' }}>
            {index === 0 && (
              <div className="header">
                <h1 className="title">Personal info</h1>
                <p className="exp">Please provide your name, email address, and phone number.</p>
              </div>
            )}
            {index === 1 && (
              <div className="header">
                <h1 className="title">Select your plan</h1>
                <p className="exp">You have the option of monthly or yearly billing.</p>
              </div>
            )}
            {index === 2 && (
              <div className="header">
                <h1 className="title">Pick add-ons</h1>
                <p className="exp">Add-ons help enhance your gaming experience.</p>
              </div>
            )}
            {index === 3 && (
              <div className="header">
                <h1 className="title">Finishing up</h1>
                <p className="exp">Double-check everything looks OK before confirming.</p>
              </div>
            )}
            {index === 4 && (
              <div className="header">
                <h1 className="title">Thank you!</h1>
                <p className="exp">Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com.</p>
              </div>
            )}
            {index === 0 && (
              <form>
                <div className="label">
                  <label htmlFor="name">Name</label>
                  <p className="error">This Field Is Required</p>
                </div>
                <input required type="text" id="name" placeholder="e.g. Stephen King" />
                <div className="label">
                  <label htmlFor="email">Email Address</label>
                  <p className="error">This Field Is Required</p>
                </div>
                <input required type="text" id="email" placeholder="e.g. stephenking@lorem.com" />
                <div className="label">
                  <label htmlFor="phone">Phone Number</label>
                  <p className="error">This Field Is Required</p>
                </div>
                <input required type="tel" id="phone" placeholder="e.g. +1 234 567 890" />
              </form>
            )}
            {index === 1 && (
              <form>
                {plans.map((plan, idx) => (
                  <div key={idx} className={`plan-card ${selectedPlan === plan ? 'selected' : ''}`} onClick={() => handlePlanSelection(plan)}>
                    <b>{plan.name}</b>
                    <span className="plan-priced">{plan.price}</span>
                  </div>
                  
                ))}
              </form>
            )}
            {index === 2 && (
              <form>
                {addons.map((addon, idx) => (
                  <div key={idx} className={`box ${selectedAddons.some(item => item.id === addon.id) ? 'ad-selected' : ''}`} onClick={() => handleAddonSelection(addon)}>
                    <input type="checkbox" id={`addon-${addon.id}`} />
                    <div className="description">
                      <label htmlFor={`addon-${addon.id}`}>{addon.name}</label>
                      <small>{addon.description}</small>
                    </div>
                    <p className="price">{addon.price}</p>
                  </div>
                ))}
              </form>
            )}
            {index === 3 && (
              <div className="summary">
                <div className="plan">
                  <b>Plan:</b>
                  <span>{selectedPlan?.name}</span>
                  <span>{selectedPlan?.price}</span>
                </div>
                <div className="addons">
                  <b>Add-ons:</b>
                  {selectedAddons.map((addon, idx) => (
                    <div key={idx}>
                      <span>{addon.name}</span>
                      <span>{addon.price}</span>
                    </div>
                  ))}
                </div>
                <div className="billing">
                  <b>Billing:</b>
                  <div className="radio">
                    <input type="radio" id="monthly" checked={!isYearlyBilling} onChange={toggleBillingPeriod} />
                    <label htmlFor="monthly">Monthly</label>
                  </div>
                  <div className="radio">
                    <input type="radio" id="yearly" checked={isYearlyBilling} onChange={toggleBillingPeriod} />
                    <label htmlFor="yearly">Yearly</label>
                  </div>
                </div>
              </div>
            )}
            <div className="actions">
              {index > 0 && <button className="prev-stp" onClick={handlePrevStep}>Previous</button>}
              {index < 4 && <button className="next-stp" onClick={handleNextStep}>Next</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiStepForm;