'use client'
import { useLocalStorage } from '@/hooks/useLocalStorage';
import React, { useEffect, useState } from 'react'

const Confirmation = () => {
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
  const localStorage = useLocalStorage("userDetails");
  useEffect(() => {
    if (localStorage) {
      setFullName(localStorage.getItem().fullname);
      setPhone(localStorage.getItem().phone);
    }
  })
  return (
    <div className="my-3 tracking-wide">
    Dear <span className="text-slate-700 font-bold">{fullName}</span>, Your
    order has been Confirmed and a order slip has been sent to your phone
    number, <span className="text-slate-700 font-bold">{phone}</span>
  </div>
  )
}

export default Confirmation