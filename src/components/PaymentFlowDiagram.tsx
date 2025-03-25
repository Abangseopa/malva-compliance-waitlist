
import React from 'react';
import { ArrowDown, ArrowRight, Building, Banknote, Wallet, CreditCard } from 'lucide-react';

const PaymentFlowDiagram = () => {
  return (
    <div className="w-full max-w-4xl mx-auto py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
        {/* Business A Section */}
        <div className="flex flex-col items-center text-center">
          <div className="glass-card p-4 w-full flex flex-col items-center justify-center min-h-[120px]">
            <Building className="h-10 w-10 text-malva-600 mb-2" />
            <h3 className="font-semibold text-lg">Business A</h3>
            <p className="text-sm text-gray-600">Sends USD Payment</p>
          </div>
          <ArrowDown className="h-8 w-8 my-2 text-malva-500 hidden md:block" />
          <div className="hidden md:flex items-center justify-center">
            <Banknote className="h-6 w-6 text-green-600 mr-2" />
            <span className="text-sm font-medium">USD Payment</span>
          </div>
        </div>

        {/* Middle Platform Section */}
        <div className="flex flex-col items-center text-center">
          <div className="glass-card p-4 w-full flex flex-col items-center justify-center min-h-[120px] border-2 border-malva-200 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-malva-50 px-3 py-1 rounded-full text-xs font-medium text-malva-700">
              Your Platform
            </div>
            <Wallet className="h-10 w-10 text-malva-600 mb-2" />
            <h3 className="font-semibold text-lg">Malva</h3>
            <p className="text-sm text-gray-600">Handles wallets & conversion</p>
          </div>
          <div className="flex items-center justify-center my-2">
            <ArrowRight className="h-8 w-8 text-malva-500 hidden md:block" />
          </div>
          <div className="glass-card p-3 w-4/5 hidden md:block">
            <div className="text-sm font-medium text-center">Stablecoin</div>
            <p className="text-xs text-gray-500">Instant transfer</p>
          </div>
        </div>

        {/* Business B Section */}
        <div className="flex flex-col items-center text-center">
          <div className="glass-card p-4 w-full flex flex-col items-center justify-center min-h-[120px]">
            <Building className="h-10 w-10 text-malva-600 mb-2" />
            <h3 className="font-semibold text-lg">Business B</h3>
            <p className="text-sm text-gray-600">Receives funds instantly</p>
          </div>
          <ArrowDown className="h-8 w-8 my-2 text-malva-500 hidden md:block" />
          <div className="hidden md:flex items-center justify-center">
            <CreditCard className="h-6 w-6 text-green-600 mr-2" />
            <span className="text-sm font-medium">Withdraw to bank</span>
          </div>
        </div>
        
        {/* Mobile view arrows */}
        <div className="block md:hidden col-span-1 my-2">
          <div className="flex items-center justify-center">
            <ArrowDown className="h-8 w-8 text-malva-500" />
          </div>
        </div>
        <div className="block md:hidden col-span-1 my-2">
          <div className="flex items-center justify-center">
            <ArrowDown className="h-8 w-8 text-malva-500" />
          </div>
        </div>
      </div>
      
      {/* Key benefit message */}
      <div className="mt-6 text-center bg-malva-50 p-4 rounded-lg">
        <p className="text-malva-800 font-medium">
          Companies never have to handle crypto wallets — they just use their normal bank accounts
        </p>
      </div>
    </div>
  );
};

export default PaymentFlowDiagram;
