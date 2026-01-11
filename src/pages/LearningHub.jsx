function LearningHub() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Learning Hub</h2>

      {/* Crypto Basics */}
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl mb-6">
        <h3 className="text-xl font-semibold mb-2">
          Crypto Basics
        </h3>
        <p className="text-white/80 mb-4">
          Learn what cryptocurrencies are, how they work, and why they matter.
        </p>
        <ul className="list-disc list-inside space-y-2 text-blue-300">
          <li>
            <a
              href="https://www.coinbase.com/learn/crypto-basics"
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
            >
              Coinbase – Crypto Basics
            </a>
          </li>
          <li>
            <a
              href="https://www.investopedia.com/terms/c/cryptocurrency.asp"
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
            >
              Investopedia – Cryptocurrency Explained
            </a>
          </li>
        </ul>
      </div>

      {/* Blockchain */}
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl mb-6">
        <h3 className="text-xl font-semibold mb-2">
          Blockchain Technology
        </h3>
        <p className="text-white/80 mb-4">
          Understand the technology behind cryptocurrencies and decentralization.
        </p>
        <ul className="list-disc list-inside space-y-2 text-blue-300">
          <li>
            <a
              href="https://ethereum.org/en/developers/docs/intro-to-ethereum/"
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
            >
              Ethereum – Intro to Blockchain
            </a>
          </li>
          <li>
            <a
              href="https://www.ibm.com/topics/what-is-blockchain"
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
            >
              IBM – What is Blockchain?
            </a>
          </li>
        </ul>
      </div>

      {/* Trading & Investing */}
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl mb-6">
        <h3 className="text-xl font-semibold mb-2">
          Trading & Investing
        </h3>
        <p className="text-white/80 mb-4">
          Learn basic trading strategies, long-term investing, and risk management.
        </p>
        <ul className="list-disc list-inside space-y-2 text-blue-300">
          <li>
            <a
              href="https://www.binance.com/en/academy"
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
            >
              Binance Academy
            </a>
          </li>
          <li>
            <a
              href="https://www.investopedia.com/cryptocurrency-4427699"
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
            >
              Investopedia – Crypto Investing
            </a>
          </li>
        </ul>
      </div>

      {/* Security & Scams */}
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl">
        <h3 className="text-xl font-semibold mb-2">
          Security & Scam Awareness
        </h3>
        <p className="text-white/80 mb-4">
          Learn how to protect your assets and identify common crypto scams.
        </p>
        <ul className="list-disc list-inside space-y-2 text-blue-300">
          <li>
            <a
              href="https://www.consumer.ftc.gov/articles/what-know-about-cryptocurrency-scams"
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
            >
              FTC – Crypto Scams
            </a>
          </li>
          <li>
            <a
              href="https://www.coindesk.com/learn/how-to-avoid-crypto-scams/"
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
            >
              CoinDesk – How to Avoid Crypto Scams
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default LearningHub;
