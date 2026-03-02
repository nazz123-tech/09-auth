'use client'
import Link from 'next/link'
import { useAuthStore } from '@/lib/store/authStore'
import { useRouter } from "next/navigation"
import { logout } from "@/lib/api/clientApi"

const AuthNavigation=()=>{
    const router = useRouter()
    const {isAuthenticated}=useAuthStore()
    const clearIsAuthenticated=useAuthStore((state)=>state.clearIsAuthenticated)
    const handleLogout=async()=>{
        await logout();
        clearIsAuthenticated();
        router.push('/sign-in')
    }
    return isAuthenticated ? (
    <li>
      <button onClick={handleLogout}>Logout</button>
    </li>
  ) : (
    <>
      <li>
	      <Link href="/sign-in">Login</Link>
      </li>
      <li>
	      <Link href="/sign-up">Sign up</Link>
	    </li>
    </>
  );
}

export default AuthNavigation;