// components/Header.js
import { ConnectButton } from 'web3uikit';

export default function Header() {
  return (
    <div className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-4xl font-bold text-white">Decentralized Lottery</h1>
        <ConnectButton
          moralisAuth={false}
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:shadow-outline-green active:bg-green-800"
        />
      </div>
    </div>
  );
}
