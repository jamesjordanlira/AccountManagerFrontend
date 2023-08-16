import { Outlet } from 'react-router-dom';

const AutLayout = () => {
  return (
    <>
        <main className=' mx-auto md:flex md:justify-center'>
            <div className="">
                <Outlet />
            </div>
        </main>
    </>
  )
}

export default AutLayout