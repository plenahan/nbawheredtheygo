'use client';

export default function GuessBox() {

    return (
        <div>
            <div className="flex flex-row space-x-2 border rounded-xl p-1">
                <div id="guessNum" className="flex flex-col">
                    <div>Guess #</div>
                </div>
                <div id="college" className="flex flex-col">
                    <div>College</div>
                </div>
                <div id="division" className="flex flex-col">
                    <div>Division</div>
                </div>
                <div id="conference" className="flex flex-col">
                    <div>Conference</div>
                </div>
                <div id="region" className="flex flex-col">
                    <div>Region</div>
                </div>
                <div id="state" className="flex flex-col">
                    <div>State</div>
                </div>
            </div>
        </div>
    );
}