import { Context } from "./context";

export interface ContextEntryProps {
    context: Context;
}

export const ContextEntry = (props: ContextEntryProps) => {
    return (
    <div>
        Context here
    </div>
    );
} 