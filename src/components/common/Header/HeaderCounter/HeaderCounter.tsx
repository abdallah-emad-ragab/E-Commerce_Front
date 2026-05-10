import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

type HeaderProps = {
    logo: React.ReactNode;
    navigateTo: string;
    totalQuantity: number;
}

export default function HeaderCounter({ logo, navigateTo, totalQuantity } : HeaderProps) {
    const navigate = useNavigate();
    const [isAnimated, setIsAnimated] = useState(false);
    const prevQuantity = useRef(totalQuantity);

    useEffect(() => {
        if (totalQuantity === 0 || totalQuantity === prevQuantity.current) return;
        prevQuantity.current = totalQuantity;
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsAnimated(true);
        const timer = setTimeout(() => setIsAnimated(false), 500);
        return () => clearTimeout(timer);
    }, [totalQuantity]);

    return (
        <div
            className="position-relative p-2 transition-all"
            onClick={() => navigate(navigateTo)}
            style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
            onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.8';
                e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.transform = 'scale(1)';
            }}
        >
            {logo}
            {totalQuantity > 0 && (
                <span
                    className={`badge bg-danger text-white position-absolute top-0 start-100 translate-middle rounded-pill fw-bold ${isAnimated ? 'animate__animated animate__bounceIn' : ''}`}
                    style={{
                        fontSize: '0.75rem',
                        minWidth: '20px',
                        height: '20px',
                        lineHeight: '1.2',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    {totalQuantity}
                </span>
            )}
        </div>
    )
}