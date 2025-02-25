'use client'
import Link from 'next/link'
import Button from './Button'
import { useRouter } from 'next/navigation'


const Nav = () => {
  const router = useRouter();
  const movePage = (pageName : string) =>{  
    router.push(pageName);
  }

  return (
    <div className="w-full h-screen flex flex-col items-center bg-slate-500">
      <div className="w-full h-20 mt-12 flex justify-center items-center">
        <Link href={'/main'} className="h-4/5 text-white text-5xl">
          일정관리
        </Link>
      </div>
      <div className="flex flex-col mt-28 items-center">
        <div className="w-full m-4">
          <Link href={'/main'}>
            <Button text="일정목록" variant="nav" />
          </Link>
        </div>
        <div className="w-full m-4">
          <Link href={'/create'}>
            <Button text="일정등록" variant="nav" />
          </Link>
        </div>
        <div className="w-full m-4">
            <Button text="일정목록(heroUI)" onClick={()=>movePage("/heroUIList")} variant="nav" />
        </div>
        <div className="w-full m-4">
            <Button text="스케쥴" onClick={()=>movePage("/schedule")} variant="nav" />
        </div>
      </div>
    </div>
  )
}

export default Nav
