import React from 'react'

export default function Footer() {
  return (
    <div className='bg-secondary pt-2 pb-5 text-light text-center'>
      <div className='mt-3'>

        <a
          className='text-light text-decoration-none mx-2'
          href="https://www.linkedin.com/in/rajan-kushwaha-69911b354/"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>

        <a
          className='text-light text-decoration-none mx-2'
          href="https://github.com/rajankushwaha007"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>

        <a
          className='text-light text-decoration-none mx-2'
          href="https://www.instagram.com/freak_coder_007?igsi=MXp5NDU3d2dmejBu"
          target="_blank"
          rel="noreferrer"
        >
          Instagram
        </a>


      </div>
      <a
        className='text-light text-decoration-none'
        href="https://rajan-portfolio-zk98.vercel.app"
        target="_blank"
        rel="noreferrer"
      >
        © 2026 Rajan Kushwaha
      </a>

      | News24. All Rights Reserved.

    </div>
  )
}