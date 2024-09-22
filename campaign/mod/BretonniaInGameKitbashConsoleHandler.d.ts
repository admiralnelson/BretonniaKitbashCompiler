declare namespace BretonniaInGameKitbash {
    type ConsoleCallback = {
        (params: string[]): void;
    };
    export namespace ConsoleHandler {
        function Register(luaRegexPattern: string, callback: ConsoleCallback): void;
    }
    export {};
}
