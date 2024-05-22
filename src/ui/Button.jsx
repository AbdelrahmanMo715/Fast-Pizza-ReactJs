import React from 'react'
import { Link } from 'react-router-dom'

function Button({children,disabled,to,type,onClick}) {

    const base = `bg-yellow-400  
    font-semibold rounded-full uppercase
     hover:bg-yellow-300 transition-colors 
     duration-300 tracking-wide focus:outline-none focus:bg-yellow-400 focus:ring 
     focus:ring-offset-1 focus:ring-yellow-300
      disabled:bg-stone-700 disabled:cursor-not-allowed disabled:text-stone-100`
    const styles = {
        primary : base + ` text-md px-3 py-4 `,

        small : base + ` text-xs px-2 py-2`,

        secondary : ` bg-transparent border-2 border-stone-300 
        font-semibold rounded-full uppercase
         hover:bg-stone-800 hover:text-stone-200 transition-colors 
         duration-300 tracking-wide focus:outline-none focus:bg-stone-400 focus:ring 
         focus:ring-offset-1 focus:ring-stone-300
          disabled:bg-stone-700 disabled:cursor-not-allowed disabled:text-stone-100 ext-md px-3 py-3`,

          round : `bg-yellow-400 rounded-full text-stone-800 
          flex items-center justify-center p-1 
          w-[25px] h-[25px] focus:outline-none focus:bg-yellow-400 focus:ring 
          focus:ring-offset-1 focus:ring-yellow-300`
    }


if(to) return (
        <Link to={to} className={styles[type]}>{children}</Link>
      )
  if(onClick) return (
    <button onClick={onClick} className={styles[type]}
     disabled={disabled}
     >
      {children}
    </button>
  )
  return (
    <button className={styles[type]}
     disabled={disabled}
     >
      {children}
    </button>
  )
}

export default Button
