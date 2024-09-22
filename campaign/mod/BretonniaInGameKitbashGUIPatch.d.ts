declare namespace BretonniaInGameKitbash {
    class GUIPatch {
        private static bInited;
        private static SetupPatchSlotLabels_TimerIndex;
        private static bIsUIPatched;
        private static CurrentCharacterAgent;
        private static readonly LocalisationStringConstants;
        private static LocalisationCachedString;
        private static RefreshCachedLocString;
        private static Reset;
        private static ShowMountUI;
        static CloseUI(): void;
        private static PatchSlotLabelsTick;
        static get CurrentSubtypeAgentInTheScreen(): Character | null;
        static SetupPatchSlotLabels(): void;
    }
}
