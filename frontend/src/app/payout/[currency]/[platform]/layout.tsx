export async function generateStaticParams() {
    try {
        const res = await fetch('http://localhost:8080/api/platforms');
        if (res.ok) {
            const platforms = await res.json();
            const currencies = ['usd', 'gbp', 'eur', 'aud', 'aed'];
            const params = [];
            for (const p of platforms) {
                for (const c of currencies) {
                    params.push({ currency: c, platform: p.slug });
                }
            }
            return params;
        }
    } catch (e) {
        console.error(e);
    }
    return [{ currency: 'usd', platform: 'payoneer' }];
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
