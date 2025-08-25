import { CardListView } from "@/components/view";
import { APIView } from "@/features/harry-potter";
import { ja } from "@/shared/lang/ja";
import { CheckerProps } from "@/shared/types/object";
import { HttpError } from "@/utils/error/http";
import { Result, RESULT_NG } from "@/utils/result";

interface Props {
    character: Result<APIView[], HttpError>;
}

function StaticGeneratorScreen<T extends Props>(
    props: CheckerProps<T, Props, "This props is different from Props.">
) {
    const { character } = props;

    if (character.kind === RESULT_NG) {
        return <div>静的生成が失敗してます。</div>;
    }

    return (
        <CardListView
            potters={character.value}
            title={ja.app.staticGeneratorPotter.title}
        />
    );
}

export default StaticGeneratorScreen;
