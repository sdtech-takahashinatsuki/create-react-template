import { CardListView } from "@/components/view";
import { getCharacter } from "@/features/harry-potter";
import { ja } from "@/shared/lang/ja";
import { RESULT_NG } from "@/utils/result";
import { Suspense } from "react";

async function NoStorePotter() {
    const potters = await getCharacter("no-store");

    if (potters.kind === RESULT_NG) {
        return <div>error</div>;
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CardListView
                potters={potters.value}
                title={ja.app.noStorePotter.title}
            />
        </Suspense>
    );
}

export default NoStorePotter;
