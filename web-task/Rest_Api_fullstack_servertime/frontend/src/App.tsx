import { TimeCard } from './components/TimeCard';
import { FileTransferCard } from './components/FileTransferCard';
import { UserCrudCard } from './components/UserCrudCard';

export default function App() {
    return (
       

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto p-4">
    <div className="space-y-6">
        <TimeCard />
        <FileTransferCard />
    </div>
    <div className="lg:col-span-2">
        <UserCrudCard />
    </div>
</div>
    );
}