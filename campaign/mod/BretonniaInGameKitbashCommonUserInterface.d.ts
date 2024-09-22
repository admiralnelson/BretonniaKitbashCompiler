declare namespace BretonniaInGameKitbash {
    /**
     * Displays alert dialog box
     * @param message the message to display
     * @param onAccept when ok button was clicked
     */
    function alert(message: string, onAccept?: VoidCallback): void;
    /**
     * Displays confirmation dialog box (Yes/No)
     * @param message the message to display
     * @param onAccept what happens if yes clicked
     * @param onCancel what happens if no clicked (defaults does nothing)
     */
    function confirm(message: string, onAccept: VoidCallback, onCancel?: VoidCallback): void;
    namespace CommonUserInterface {
        /**
         * Retrieves a localised string from the database by its full localisation key.
         * @param stringId the string id for example: random_localisation_strings_string_Construction_site
         * @returns an empty string if stringId is invalid
         */
        function GetLocalisedString(stringId: string): string;
        /** Destroy one or more components */
        function Destroy(...components: IUIComponent[]): void;
        /**
         * Creates new UI from a file.
         * @param identifier the name of this created UI
         * @param uiFilePath *.twui.xml file path. Must be valid. XML must be valid
         * @param parent parent of this UI. optional, defaults will be UI root.
         * @returns the created compoenent. Will return null if creation was failed
         */
        function New(identifier: string, uiFilePath: string, parent?: IUIComponent): IUIComponent | null;
        /**
         * Gets the Root UI
         */
        function GetRootUI(): IUIComponent;
        /**
         * Casts opaque pointer `IUIComponentAddress` into usable `IUIComponent` object
         */
        function Cast(address: IUIComponentAddress | IUIComponent): IUIComponent;
        /**
         * Finds and returns a uicomponent based on a set of strings that define its path in the ui hierarchy. This parent uicomponent can be supplied as the first argument - if omitted, the root uicomponent is used.
         * Starting from the parent or root, the function searches through all descendants for a uicomponent with the next supplied uicomponent name in the sequence.
         * If a uicomponent is found, its descendants are then searched for a uicomponent with the next name in the list, and so on until the list is finished or no uicomponent with the supplied name is found.
         * @param parentComponent
         * @param componentNames
         * @returns the component, returns null if it can't find what you're looking for.
         */
        function Find(parentComponent?: IUIComponent, ...componentNames: string[]): IUIComponent | null;
        class MessageBox implements IPopupDialog {
            private static readonly PropagatePriority;
            readonly identifier: string;
            private messageBoxComponent;
            private message;
            private onAccept;
            private onCancel;
            constructor(message: string, onAccept: VoidCallback, onCancel?: VoidCallback);
            Push(): void;
            Pop(): void;
            private Top;
            Show(): void;
        }
    }
}
