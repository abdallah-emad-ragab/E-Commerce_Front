import { Outlet } from 'react-router-dom';
import { Header, Footer } from '../../components/common';

export default function MainLayout() {
    return (
        <div className="min-vh-100 d-flex flex-column">
            <Header />
            <main className="flex-grow-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}