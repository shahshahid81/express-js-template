import { DefaultNamingStrategy, NamingStrategyInterface } from 'typeorm';
import pluralize from 'pluralize';
import { camelToSnakeCase } from '../../utils/camel-to-snake-case';

export class CustomNamingStrategy
	extends DefaultNamingStrategy
	implements NamingStrategyInterface
{
	override tableName(targetName: string, userSpecifiedName?: string): string {
		const tableName = userSpecifiedName ? userSpecifiedName : targetName;
		return 'tbl_' + pluralize(camelToSnakeCase(tableName));
	}

	override columnName(propertyName: string, customName?: string): string {
		const columnName = customName ? customName : propertyName;
		return camelToSnakeCase(columnName);
	}

	override joinTableName(
		firstTableName: string,
		secondTableName: string
	): string {
		return camelToSnakeCase(firstTableName + '_' + secondTableName);
	}

	override joinColumnName(tableName: string, propertyName: string): string {
		return camelToSnakeCase(tableName + '_' + propertyName);
	}

	override foreignKeyName(tableOrName: string, columnNames: string[]): string {
		return camelToSnakeCase(tableOrName + '_' + columnNames.join('_'));
	}
}
