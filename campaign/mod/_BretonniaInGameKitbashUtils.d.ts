declare namespace BretonniaInGameKitbash {
    type TimerCallback = () => void;
    type VoidCallback = () => void;
    const console: {
        log: (...s: string[]) => void;
        warn: (...s: string[]) => void;
        error: (...s: string[]) => void;
    };
    class localStorage {
        static setItem(key: string, value: any): void;
        /**
         * @warning  use 'as' to cast it to luatable, string, number, null, etc. (yes, null is a type in TS)
         */
        static getItem(key: string): unknown;
        static removeItem(key: string): void;
    }
    /**
     * Fires when a campaign starts (or every session change from battle -> campaign)
     * @param callback
     */
    function OnCampaignStart(callback: VoidCallback): void;
    /**
     * Clamp such that min >= v <= max
     * @param v
     * @param min
     * @param max
     * @returns
     */
    function clamp(v: number, min: number, max: number): number;
    /**
     * Generate alphanumeric random string
     * @param len how long the string is
     * @returns random alphanumeric string
     */
    function RandomString(len?: number): string;
    /** Generates multiplayer safe random integer from [lowerbound, upperbound]
     * @param upperbound upperbound (inclusive)
     * @param lowerbound lowerbound (inclusive)
    */
    function RandomNumber(upperbound?: number, lowerbound?: number): number;
    /** returns a single dice roll */
    function DiceRoll(numberOfSide: number): number;
    /** choose random element in an array
     * should be multiplayer safe
     * @returns if array is empty, null is returned
     */
    function ChooseRandom(array: unknown[]): unknown | null;
    /**
     * Rolls a xDy dice. For example 2D5 > 10 (the threshold)?
     * @param threshold total points
     * @param numberOfDice how many dices to be rolled
     * @param numberOfSide number of side on a dice
     */
    function IsDiceRollSucess(threshold: number, numberOfDices: number, numberOfSide: number): boolean;
    /**
     * Returns true or false. 50% chance
     */
    function IsTrueOrFalse(): boolean;
    /** returns the current turn number */
    function GetTurnNumber(): number;
    /**
     * Override the battle environment of upcoming battles.
     * @param fileName 	The file path of the battle environment file. E.g. "weather/battle/wh_day_clear_02.environment_group"
     */
    function SetBattleLightingOverride(fileName: string): void;
    /**
     * Clears battle ligthing settings.
     */
    function ClearBattleLightingOverride(): void;
    function PerformanceCounterBegin(): number;
    function PerformanceCounterEnd(): number;
    /**
     * Gets difficulty level for local player
     * @returns current difficulty level, the lower the number, the easier
     */
    function GetCampaignDifficultyLocal(): number;
    function IsMultiplayer(): boolean;
    /**
     * Matches string based on a pattern. Subtitute for javascript regex
     * @param input string to find the patterns
     * @param pattern lua regex pattern
     * @returns lua regex capture groups
     */
    function LuaStringMatcher(input: string, pattern: string): string[];
    function IsFileExistVFS(filenameWithPath: string): boolean;
    /**
     * The global setTimeout() method sets a timer which executes a function or specified piece of code once the timer expires.
     * @param callback A function to be executed after the timer expires.
     * @param inMilliSecond The time, in milliseconds that the timer should wait before the specified function or code is executed. If this parameter is omitted, a value of 0 is used, meaning execute "immediately", or more accurately, the next event cycle.
     * @returns The returned timeoutID is a positive integer value which identifies the timer created by the call to setTimeout(). This value can be passed to clearTimeout() to cancel the timeout.
     */
    function setTimeout(callback: TimerCallback, inMilliSecond?: number): number;
    /**
     * The setInterval() method, offered on the `real_timer` interface, repeatedly calls a function or executes a code snippet, with a fixed time delay between each call.
     * This method returns an interval ID which uniquely identifies the interval, so you can remove it later by calling clearInterval().
     * @param callback A function to be executed every delay milliseconds. The first execution happens after delay milliseconds.
     * @param inMilliSecond The time, in milliseconds (thousandths of a second), the timer should delay in between executions of the specified function or code. Defaults to 10 if not specified, lowest value is 10
     * @returns The returned intervalID is a numeric, non-zero value which identifies the timer created by the call to setInterval(); this value can be passed to clearInterval() to cancel the interval.
     */
    function setInterval(callback: TimerCallback, inMilliSecond?: number): number;
    /**
     *
     * @param id The global clearInterval() method cancels a timed, repeating action which was previously established by a call to setInterval(). If the parameter provided does not identify a previously established action, this method does nothing.
     * @returns true if clear was successful
     */
    function clearInterval(id: number): boolean;
}
