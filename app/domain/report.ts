import { Food } from './food.ts';
import { MealGroup } from './meal-groups.ts';
import { Meal } from './meal.ts';

export function styles() {
    return `
        <style>
            html, body {
                font-family: Arial, sans-serif;
                font-size: 14px;
                margin: 0;
                padding: 0;
            }
        
            table {
                width: 100%;
                border-collapse: collapse;
                table-layout: fixed;;
                text-align: left;
            } 
            
            td {
                border: 1px solid #ddd;
            }
        </style>    
    `;
}

export function foodCells(food: Food[], colspan = 1, bold = false, customName?: string) {
    return food.map((product) => {
        const name = customName || product.name;

        return `
            <td colspan="${colspan}">
                ${bold ? `<b>${name}</b>` : name}
            </td>
            <td>${product.weight.toFixed(2)}</td>
            <td>${product.kcal.toFixed(2)}</td>
            <td>${product.protein.toFixed(2)}</td>
            <td>${product.fat.toFixed(2)}</td>
            <td>${product.carbs.toFixed(2)}</td>
            <td>${(product.fiber || 0).toFixed(2)}</td>
        `;
    }).join('');
}

export function mealRow(meal: Meal & { summary: Food }) {
    return `${meal.items.map((item, index) => (`
        ${meal.name
        ? `
                ${index === 0
            ? `
                <tr>
                    ${foodCells([meal.summary], 2, true, meal.name)}
                </tr>
                ` : ''}
                <tr>
                    <td></td>
                    ${foodCells([item.food!], 1, false, `- ${item.food!.name}`)}
                </tr>
                `
        : `
                <tr>
                ${foodCells([item.food!], 2)}
            </tr>
        `}
    `)).join('')}`;
}

export function groupSummary(group: MealGroup) {
    return `<tr>
        ${foodCells([group.summary], 2, true)}
    </tr>`;
}

export function foodTable(food: Food[]) {
    return `
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Document</title>
    ${styles()}
</head>
<body>
    <table>
        <thead>
            <tr>
                <th>Product</th>
                <th>Weight</th>
                <th>Kcal</th>
                <th>Protein</th>
                <th>Fat</th>
                <th>Carbs</th>
                <th>Fiber</th>
            </tr>
        <tbody>
            ${food.map((product) => (`
                <tr>${foodCells([product])}</tr>
            `)).join('')}
        </tbody>
    </table>
</body>`;
}

export const mealTable = (mealGroups: MealGroup[]) => {
    return `
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Document</title>
    ${styles()}
</head>
<body>
    <table>
        <thead>
            <tr>
                <th colspan="2">Name</th>
                <th>Weight</th>
                <th>Kcal</th>
                <th>Protein</th>
                <th>Fat</th>
                <th>Carbs</th>
                <th>Fiber</th>
            </tr>
        <tbody>
            ${mealGroups.map((group) => (`
                <tr><td colspan="8"><b>${group.rangeAsString}</b></td></tr>
                ${group.data.map((meal) => mealRow(meal)).join('')}
                ${groupSummary(group)}
            `)).join('')}
        </tbody>
    </table>
</body>
</html>`;
};
