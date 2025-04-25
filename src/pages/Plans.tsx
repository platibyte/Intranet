import React, { useState } from 'react';
import Layout from '@/components/Layout';

const plans = [
    { name: 'Mai-Plan', file: '/pdfs/Mai-Plan.pdf' },
    { name: 'April-Plan', file: '/pdfs/April-Plan.pdf' },
    { name: 'Stundenplan Simon', file: '/pdfs/Stundenplan_Simon.pdf' },
    { name: 'Termine Simon', file: '/pdfs/Termine_Simon.pdf' },
    { name: 'Stundenplan Dominik', file: '/pdfs/Stundenplan_Dominik.pdf' },
    { name: 'Termine Dominik', file: '/pdfs/Termine_Dominik.pdf' },
    { name: 'Telefonliste Dominik', file: '/pdfs/Telefonliste_Dominik.pdf' },
];

const Plans = () => {
    const [selectedPlan, setSelectedPlan] = useState(plans[0].file);

    return (
        <Layout>
            <div className="grid grid-cols-4 gap-6 mb-12">
                {/* Linke Spalte mit Plan-Liste */}
                <div className="col-span-1 p-4 bg-gray-100 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Pläne</h2>
                    <ul>
                        {plans.map((plan, index) => (
                            <li key={index}>
                                <button 
                                    className={`w-full text-left p-2 rounded-lg ${selectedPlan === plan.file ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} 
                                    onClick={() => setSelectedPlan(plan.file)}
                                >
                                    {plan.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                
                {/* Rechte Spalte mit PDF-Ansicht */}
                <div className="col-span-3 glass-panel rounded-xl p-6 animate-slide-in">
                    <h2 className="text-2xl font-semibold mb-4">{plans.find(p => p.file === selectedPlan)?.name}</h2>
                    <embed 
                        src={selectedPlan} 
                        type="application/pdf" 
                        width="100%" 
                        height="500px" 
                    />
                </div>
            </div>
        </Layout>
    );
};

export default Plans;
