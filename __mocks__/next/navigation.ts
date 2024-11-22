import { vi } from 'vitest';

export const pushMock = vi.fn();

const usePathname = () => '/';
const useRouter = () => ({
    push: pushMock
})

export {
    usePathname,
    useRouter
}