import { vi } from 'vitest';

export const pushMock = vi.fn();

const usePathname = () => '/';
const useRouter = () => ({
    push: pushMock
})
const searchParams = new URLSearchParams('?brand=audi-mercedes+benz');
const useSearchParams = () => searchParams;

export {
    usePathname,
    useRouter,
    useSearchParams
}