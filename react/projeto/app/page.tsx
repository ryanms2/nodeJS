"use client";

import { FormEvent, useState } from 'react';
import './page.css'

export default function Home() {
  function enviar(e:FormEvent) {
    e.preventDefault()
    console.log(email)
  }

  const john: string = "aaaa"
  
  const [email, setEmail] = useState();

  return (
    <div className='layout'>
      <div className='container_login'>
        <form onSubmit={enviar}>
          <div>
            <label htmlFor="email">email</label>
            <input type="email" name='email' id='email' onChange={(e: any) => setEmail(e.target.value)} />
          </div>
          <div>
            <label htmlFor="password">Senha</label>
            <input type="password" name='password' id='password' />
          </div>
          
          <input type="submit" value="Enviar" />
        </form>
      </div>
    </div>
  );
}
