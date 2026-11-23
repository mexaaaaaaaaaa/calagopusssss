import type { FC } from 'react';
import type { CSSVariablesResolver, MantineThemeOverride } from '@mantine/core';

export interface ThemeRegistryLike {
  disableVariants?: (options?: { schemes?: Array<'light' | 'dark'> }) => unknown;
}

export interface ComponentListRegistryLike {
  prependComponent?: (component: FC) => unknown;
  appendComponent?: (component: FC) => unknown;
}

export interface ExtensionRegistryLike {
  enterThemes?: (callback: (registry: ThemeRegistryLike) => unknown) => unknown;
  enterGlobal?: (callback: (registry: ComponentListRegistryLike) => unknown) => unknown;
}

/**
 * Type-safe adapter mirroring the Calagopus Panel `shared` extension contract:
 * `import { Extension, ExtensionContext } from 'shared';`
 *
 * Inside the full `calagopus/panel` build environment, imports of `'shared'`
 * resolve directly to `calagopus/panel/frontend/extensions/shared`.
 */
export class ExtensionContext {
  public readonly extensionIdentifier?: string;
  public extensionRegistry?: ExtensionRegistryLike;
}

export class Extension {
  public packageName = '';

  public initialize(_ctx: ExtensionContext): void {}

  public initializeMantineTheme(_ctx: ExtensionContext): MantineThemeOverride {
    return {};
  }

  public initializeMantineCssResolver(_ctx: ExtensionContext): CSSVariablesResolver | null {
    return null;
  }
}

export { Extension as CalagopusExtensionBase };
