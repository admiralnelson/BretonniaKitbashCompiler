declare namespace BretonniaInGameKitbash {
    class Logger {
        private _name;
        constructor(name: string);
        /**
         * log into output stream
         * @param s message
         * @param showName prints the name associated to this log (defaults true)
         */
        Log(s: string, showName?: boolean): void;
        /**
         * log into output stream with WARNING prefix,
         * if the game is launched from SNED Loader, it will be highlighted yellow
         * @param s message
         * @param showName prints the name associated to this log (defaults true)
         */
        LogWarn(s: string, showName?: boolean): void;
        /**
        * log into output stream with ERROR prefix,
        * if the game is launched from SNED Loader, it will be highlighted red
        * @param s message
        * @param showTraceback prints the trackback up to this error statement (defaults true)
        * @param showName prints the name associated to this log (defaults true)
        */
        LogError(s: string, showTraceback?: boolean, showName?: boolean): void;
    }
}
