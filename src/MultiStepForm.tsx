import React, { useEffect, useState } from 'react';
import './MultiStepForm.css';
import './assets/images/icon-thank-you.svg'

interface Plan {
  name: string;
  price: string;
  icon: string;
  
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
  const [planPrice, setPlanPrice] = useState<string>('');
  const [total, setTotal] = useState<number>(0);
  const [time, setTime] = useState<boolean>(false); // Assuming time is a boolean indicating whether it's yearly or monthly

  const plans: Plan[] = [
    { name: 'Arcade', price: '$9/mo', icon: 'icon-arcade.svg' },
    { name: 'Advanced', price: '$12/mo', icon: 'icon-advanced.svg' },
    { name: 'Pro', price: '$15/mo', icon: 'icon-pro.svg' }
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

  const handlePlanSelection = (plan: any) => {
    setSelectedPlan(plan);

    if (isYearlyBilling) {
      const yearlyPrice = parseInt(plan.price.slice(1)) * 12;
      const updatedPlan = { ...plan, price: `$${yearlyPrice}/yr` };
      setSelectedPlan(updatedPlan);
    }
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



  const calculateTotal = () => {
    const priceStr = selectedPlan ? selectedPlan.price.replace(/\D/g, '') : '0';
    const addonTotal = selectedAddons.reduce((acc, addon) => acc + parseInt(addon.price.replace(/\D/g, ''), 10), 0);
    const planTotal = isYearlyBilling ? parseInt(priceStr, 10) * 12 : parseInt(priceStr, 10);
    const total = planTotal + addonTotal;
    const billingPeriod = isYearlyBilling ? '/yr' : '/mo';
    return { total, billingPeriod };
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
            <div>
              <div className="header">
                <h1 className="title">Select your plan</h1>
                <p className="exp">You have the option of monthly or yearly billing.</p>
              </div>
              <form>

                {plans.map((plan, idx) => (
                  <div key={idx} className={`plan-card ${selectedPlan === plan ? 'selected' : ''}`} onClick={() => handlePlanSelection(plan)}>
                    <img src={`./assets/images/${plan.icon}`} alt={plan.name} /> {/* Icon */}
                    <div className="plan-info">
                      <b>{plan.name}</b>
                      <span className="plan-priced">{isYearlyBilling ? `$${parseInt(plan.price.slice(1)) * 12}/yr` : plan.price}</span>
                    </div>
                  </div>
                ))}
               
              </form>
               <div className="switcher">
                  <p className={`monthly ${!isYearlyBilling ? 'sw-active' : ''}`} onClick={() => setIsYearlyBilling(false)}>Monthly</p>
                  <label className="switch">
                    <input type="checkbox"  checked={isYearlyBilling} onChange={toggleBillingPeriod} />
                    <span className="slider round"></span>
                  </label>
                  <p className={`yearly ${isYearlyBilling ? 'sw-active' : ''}`} onClick={() => setIsYearlyBilling(true)}>Yearly</p>
                </div>
            </div>
            )}
            {index === 2 && (
              <div className="header">
                <h1 className="title">Pick add-ons</h1>
                <p className="exp">Add-ons help enhance your gaming experience.</p>
              </div>
            )}
            {index === 3 && (
             <div>
              <div className="header">
                 <h1 className="title">Finishing up</h1>
                 <p className="exp">Double-check everything looks OK before confirming.</p>
              </div>
         
             <div className="selection-box">
             <div className="selection-container">
             <div className="selected-plan">
               {/* Display selected plan name and price */}
               <p className="plan-name">{selectedPlan?.name}{isYearlyBilling ? "(Yearly)" : "(Monthly)"}</p>
               <p className="plan-price">{selectedPlan?.price}</p>
             </div>
             <hr />
             <div className="addons">
               {/* Display selected addons */}
               {selectedAddons.map((addon, idx) => (
               <div key={idx} className="selected-addon">
                 <span className="service-name">{addon.name}</span>
                 <span className="servic-price">{addon.price}</span>
               </div>
          ))}
        </div>
      </div>
      {/* Display total */}
      
      <p className="total">Total (per {isYearlyBilling ? "year" : "month"}): <b> ${calculateTotal().total}{calculateTotal().billingPeriod}</b></p> 
    </div>
             </div>
            )}
            {index === 4 && (
                <div>
                  <div>
                   <img src="/icon-thank-you.svg" alt="" />
                  </div> 
                 
                
                
                 <div className="header">
                   <h1 className="title">Thank you!</h1>
                   <p className="exp">
                    Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com.
                   </p>
                 </div>
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
    
            <div className="btns">
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

