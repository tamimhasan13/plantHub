import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';
import toast from 'react-hot-toast';

const PurchaseModal = ({ closeModal, isOpen, plant }) => {
  const {user}=useAuth();
 const { name, category, quantity, price, _id } =plant || {};
 const [selectedQuantity,setSelectedQuantity]=useState(1);
 const [totalPrice,setTotalPrice]=useState(price);
 const handleQuantity=(value)=>{
  const totalQuantity=parseInt(value)
  
  if (totalQuantity > quantity) return toast.error("Quantity not available");
  const calculatePrice=selectedQuantity*price;
  setSelectedQuantity(totalQuantity);
  setTotalPrice(calculatePrice)
 }
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none "
      onClose={closeModal}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl rounded-2xl"
          >
            <DialogTitle
              as="h3"
              className="text-lg font-medium text-center leading-6 text-gray-900"
            >
              Review Info Before Purchase
            </DialogTitle>
            <div className="mt-2">
              <p className="text-sm text-gray-500">Plant: {name}</p>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-500">Category: {category}</p>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Customer: {user?.displayName}
              </p>
            </div>

            <div className="mt-2">
              <p className="text-sm text-gray-500">Price per unit: $ {price}</p>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Available Quantity: {quantity}
              </p>
            </div>
            <hr className="mt2" />
            <p>Oder Info</p>
            <div className="mt-2">
              <input value={selectedQuantity} onChange={(e)=>handleQuantity(e.target.value)} type="number" min={1} max={quantity} className='border px-3 py-1' />
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Selected Quantity : {selectedQuantity}
              </p>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-500">Total Price: {totalPrice}</p>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default PurchaseModal
