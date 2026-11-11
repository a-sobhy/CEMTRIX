import Image from "next/image";

import conditionIntelligence from "../../../public/assets/condition-intelligence.png";

export function ConditionIntelligenceVisual() {
    return (
        <div className="rounded-xl bg-white overflow-hidden shadow-2xl p-4 sm:p-6">
            {/* Static import gives next/image the intrinsic width/height (no layout shift). */}
            <Image
                src={conditionIntelligence}
                alt="Industrial motor with a condition monitoring dashboard showing a 92% health score and vibration and temperature trends"
                sizes="(min-width: 1024px) 560px, 100vw"
                className="w-full h-auto"
            />
        </div>
    );
}
