'use client';

export default function GuessBox() {

    return (
        <div>
            <div className="flex flex-row space-x-2 border rounded-xl p-1 items-center">
                <div id="guessNum" className="flex flex-col items-center">
                    <div className="px-1 text-center">Guess #</div>
                </div>
                <div id="college" className="flex flex-col items-center">
                    <div className="px-1 text-center">College</div>
                </div>
                <div id="division" className="flex flex-col items-center">
                    <div className="px-1 text-center">Division</div>
                </div>
                <div id="conference" className="flex flex-col items-center">
                    <div className="px-1 text-center">Conference</div>
                </div>
                <div id="region" className="flex flex-col items-center">
                    <div className="px-1 text-center">Region</div>
                </div>
                <div id="state" className="flex flex-col items-center">
                    <div className="px-1 text-center">State</div>
                </div>
            </div>
        </div>
    );
}