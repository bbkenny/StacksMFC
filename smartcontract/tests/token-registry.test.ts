import { describe, expect, it } from "vitest";
import { Cl, cvToValue } from "@stacks/transactions";

const accounts = simnet.getAccounts();
const WALLET_1 = accounts.get("wallet_1")!;
const WALLET_2 = accounts.get("wallet_2")!;
const DEPLOYER = accounts.get("deployer")!;

describe("token-registry", () => {
  it("should allow the admin to add a token", () => {
    const symbol = "STX";
    const name = "Stacks";
    const contract = DEPLOYER;
    const decimals = 6;
    const logoUri = "https://example.com/logo.png";
    const chain = "Stacks";

    const { result } = simnet.callPublicFn(
      "token-registry",
      "add-token",
      [
        Cl.stringAscii(symbol),
        Cl.stringAscii(name),
        Cl.principal(contract),
        Cl.uint(decimals),
        Cl.stringAscii(logoUri),
        Cl.stringAscii(chain),
      ],
      DEPLOYER
    );

    expect(result).toBeOk(Cl.bool(true));

    const metadata = simnet.callReadOnlyFn(
      "token-registry",
      "get-token-metadata",
      [Cl.stringAscii(symbol)],
      DEPLOYER
    );

    expect(metadata.result).toBeSome(
      Cl.tuple({
        name: Cl.stringAscii(name),
        contract: Cl.principal(contract),
        decimals: Cl.uint(decimals),
        "logo-uri": Cl.stringAscii(logoUri),
        chain: Cl.stringAscii(chain),
      })
    );
  });

  it("should not allow non-admin to add a token", () => {
    const { result } = simnet.callPublicFn(
      "token-registry",
      "add-token",
      [
        Cl.stringAscii("BTC"),
        Cl.stringAscii("Bitcoin"),
        Cl.principal(DEPLOYER),
        Cl.uint(8),
        Cl.stringAscii(""),
        Cl.stringAscii("Bitcoin"),
      ],
      WALLET_1
    );

    expect(result).toBeErr(Cl.uint(100)); // ERR-NOT-AUTHORIZED
  });

  it("should allow admin to update token metadata", () => {
    // First add
    simnet.callPublicFn(
        "token-registry",
        "add-token",
        [
          Cl.stringAscii("STX"),
          Cl.stringAscii("Stacks"),
          Cl.principal(DEPLOYER),
          Cl.uint(6),
          Cl.stringAscii("old"),
          Cl.stringAscii("Stacks"),
        ],
        DEPLOYER
      );

    const { result } = simnet.callPublicFn(
      "token-registry",
      "update-token-metadata",
      [
        Cl.stringAscii("STX"),
        Cl.stringAscii("Stacks V2"),
        Cl.principal(DEPLOYER),
        Cl.uint(6),
        Cl.stringAscii("new"),
        Cl.stringAscii("Stacks"),
      ],
      DEPLOYER
    );

    expect(result).toBeOk(Cl.bool(true));

    const metadata = simnet.callReadOnlyFn(
        "token-registry",
        "get-token-metadata",
        [Cl.stringAscii("STX")],
        DEPLOYER
      );
  
      expect(metadata.result).toBeSome(
        Cl.tuple({
          name: Cl.stringAscii("Stacks V2"),
          contract: Cl.principal(DEPLOYER),
          decimals: Cl.uint(6),
          "logo-uri": Cl.stringAscii("new"),
          chain: Cl.stringAscii("Stacks"),
        })
      );
  });

  it("should not allow updating a non-existent token", () => {
    const { result } = simnet.callPublicFn(
        "token-registry",
        "update-token-metadata",
        [
          Cl.stringAscii("NONE"),
          Cl.stringAscii("None"),
          Cl.principal(DEPLOYER),
          Cl.uint(6),
          Cl.stringAscii(""),
          Cl.stringAscii("Stacks"),
        ],
        DEPLOYER
      );
  
      expect(result).toBeErr(Cl.uint(102)); // ERR-TOKEN-NOT-FOUND
  });

  it("should allow admin to remove a token", () => {
     // First add
     simnet.callPublicFn(
        "token-registry",
        "add-token",
        [
          Cl.stringAscii("DEL"),
          Cl.stringAscii("Delete Me"),
          Cl.principal(DEPLOYER),
          Cl.uint(6),
          Cl.stringAscii(""),
          Cl.stringAscii("Stacks"),
        ],
        DEPLOYER
      );

      const { result } = simnet.callPublicFn(
        "token-registry",
        "remove-token",
        [Cl.stringAscii("DEL")],
        DEPLOYER
      );

      expect(result).toBeOk(Cl.bool(true));

      const metadata = simnet.callReadOnlyFn(
        "token-registry",
        "get-token-metadata",
        [Cl.stringAscii("DEL")],
        DEPLOYER
      );
  
      expect(metadata.result).toBeNone();
  });

  it("should enforce validation on symbol and decimals", () => {
    // Empty symbol
    const res1 = simnet.callPublicFn(
        "token-registry",
        "add-token",
        [
          Cl.stringAscii(""),
          Cl.stringAscii("Invalid"),
          Cl.principal(DEPLOYER),
          Cl.uint(6),
          Cl.stringAscii(""),
          Cl.stringAscii("Stacks"),
        ],
        DEPLOYER
      );
    expect(res1.result).toBeErr(Cl.uint(103)); // ERR-INVALID-SYMBOL

    // Too many decimals
    const res2 = simnet.callPublicFn(
        "token-registry",
        "add-token",
        [
          Cl.stringAscii("BAD"),
          Cl.stringAscii("Invalid"),
          Cl.principal(DEPLOYER),
          Cl.uint(19),
          Cl.stringAscii(""),
          Cl.stringAscii("Stacks"),
        ],
        DEPLOYER
      );
    expect(res2.result).toBeErr(Cl.uint(104)); // ERR-INVALID-DECIMALS
  });

  it("should fetch multiple tokens correctly", () => {
    simnet.callPublicFn(
        "token-registry",
        "add-token",
        [Cl.stringAscii("T1"), Cl.stringAscii("T1"), Cl.principal(DEPLOYER), Cl.uint(6), Cl.stringAscii(""), Cl.stringAscii("S")],
        DEPLOYER
      );
    simnet.callPublicFn(
        "token-registry",
        "add-token",
        [Cl.stringAscii("T2"), Cl.stringAscii("T2"), Cl.principal(DEPLOYER), Cl.uint(6), Cl.stringAscii(""), Cl.stringAscii("S")],
        DEPLOYER
      );

    const { result } = simnet.callReadOnlyFn(
        "token-registry",
        "get-multiple-tokens",
        [Cl.list([Cl.stringAscii("T1"), Cl.stringAscii("T2"), Cl.stringAscii("T3")])],
        DEPLOYER
    );

    const resArray: any = cvToValue(result);
    expect(resArray).toHaveLength(3);
    expect(resArray[0]).not.toBeNull();
    expect(resArray[1]).not.toBeNull();
    expect(resArray[2].value).toBeNull();
  });

  it("should respect the pause mechanism", () => {
    // Pause contract
    simnet.callPublicFn("token-registry", "set-paused", [Cl.bool(true)], DEPLOYER);
    
    // Attempt to add token
    const { result } = simnet.callPublicFn(
      "token-registry",
      "add-token",
      [Cl.stringAscii("PAU"), Cl.stringAscii("Paused"), Cl.principal(DEPLOYER), Cl.uint(6), Cl.stringAscii(""), Cl.stringAscii("S")],
      DEPLOYER
    );
    
    expect(result).toBeErr(Cl.uint(105)); // ERR-CONTRACT-PAUSED

    // Unpause
    simnet.callPublicFn("token-registry", "set-paused", [Cl.bool(false)], DEPLOYER);

    // Attempt again
    const { result: result2 } = simnet.callPublicFn(
        "token-registry",
        "add-token",
        [Cl.stringAscii("PAU"), Cl.stringAscii("Paused"), Cl.principal(DEPLOYER), Cl.uint(6), Cl.stringAscii(""), Cl.stringAscii("S")],
        DEPLOYER
      );
    expect(result2).toBeOk(Cl.bool(true));
  });
});

describe("token status functionality", () => {
  beforeEach(() => {
    // Add a test token
    simnet.callPublicFn(
      "token-registry",
      "add-token",
      [
        Cl.stringAscii("STX"),
        Cl.stringAscii("Stacks"),
        Cl.principal(DEPLOYER),
        Cl.uint(6),
        Cl.stringAscii("logo.png"),
        Cl.stringAscii("Stacks"),
      ],
      DEPLOYER
    );
  });

  it("should check if token is verified", () => {
    const result = simnet.callReadOnlyFn(
      "token-registry",
      "is-token-verified",
      [Cl.stringAscii("STX")],
      DEPLOYER
    );

    expect(result.result).toBeOk(Cl.bool(true));
  });

  it("should return false for non-existent token", () => {
    const result = simnet.callReadOnlyFn(
      "token-registry",
      "is-token-verified",
      [Cl.stringAscii("BTC")],
      DEPLOYER
    );

    expect(result.result).toBeOk(Cl.bool(false));
  });

  it("should get multiple tokens correctly", () => {
    // Add another token
    simnet.callPublicFn(
      "token-registry",
      "add-token",
      [
        Cl.stringAscii("BTC"),
        Cl.stringAscii("Bitcoin"),
        Cl.principal(DEPLOYER),
        Cl.uint(8),
        Cl.stringAscii("btc.png"),
        Cl.stringAscii("Bitcoin"),
      ],
      DEPLOYER
    );

    const result = simnet.callReadOnlyFn(
      "token-registry",
      "get-multiple-tokens",
      [
        Cl.list([
          Cl.stringAscii("STX"),
          Cl.stringAscii("BTC"),
          Cl.stringAscii("ETH") // Doesn't exist
        ])
      ],
      DEPLOYER
    );

    const values = cvToValue(result.result);
    expect(values).toHaveLength(3);
    expect(values[0]).not.toBeNull();
    expect(values[1]).not.toBeNull();
    expect(values[2]).toBeNull();
  });

  it("should check if contract is paused", () => {
    // Initially not paused
    const result1 = simnet.callReadOnlyFn(
      "token-registry",
      "is-paused",
      [],
      DEPLOYER
    );
    expect(result1.result).toBeOk(Cl.bool(false));

    // Pause it
    simnet.callPublicFn(
      "token-registry",
      "set-paused",
      [Cl.bool(true)],
      DEPLOYER
    );

    // Now should be paused
    const result2 = simnet.callReadOnlyFn(
      "token-registry",
      "is-paused",
      [],
      DEPLOYER
    );
    expect(result2.result).toBeOk(Cl.bool(true));
  });

  it("should get token contract address", () => {
    const result = simnet.callReadOnlyFn(
      "token-registry",
      "get-token-contract",
      [Cl.stringAscii("STX")],
      DEPLOYER
    );

    expect(result.result).toBeSome(Cl.principal(DEPLOYER));
  });
});
