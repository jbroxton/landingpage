# Speqq Tables Design Guide

Tables are crucial for displaying complex data in your app. Here's how to style them consistently with your dark mode aesthetic:

## Table Design Specifications

### Basic Table Structure

```css
.speqq-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin: var(--space-8) 0;
  background-color: var(--bg-secondary);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-lg), 0 0 0 1px rgba(255, 255, 255, 0.03);
}

.speqq-table thead {
  background: linear-gradient(90deg, rgba(40, 40, 45, 0.9), rgba(35, 35, 40, 0.9));
  backdrop-filter: blur(4px);
  position: sticky;
  top: 0;
  z-index: 10;
}

.speqq-table th {
  color: var(--text-primary);
  font-weight: 600;
  text-align: left;
  padding: var(--space-4) var(--space-6);
  font-size: 0.9rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.speqq-table td {
  padding: var(--space-4) var(--space-6);
  color: var(--text-secondary);
  border-bottom: 1px solid rgba(255, 255, 255, 0.02);
  transition: background-color var(--transition-fast);
}

.speqq-table tr:last-child td {
  border-bottom: none;
}

.speqq-table tbody tr {
  transition: background-color var(--transition-fast);
}

.speqq-table tbody tr:hover {
  background-color: rgba(127, 90, 240, 0.05);
}

/* Alternating row colors */
.speqq-table-striped tbody tr:nth-child(even) {
  background-color: rgba(0, 0, 0, 0.2);
}
```

## Visual Elements

### Header Design
- Background gradient from dark to slightly darker
- Sticky positioning for scrollable tables
- Subtle blur effect (backdrop-filter)
- Uppercase column names with letter spacing
- Thin separator line below headers

### Row Design
- Standard rows with subtle hover effect
- Optional striped rows for better readability
- Animated hover state with accent color tint
- Slightly rounded corners on the table container
- Very subtle borders between rows

### Interactive Elements

#### Sortable Columns
```css
.speqq-table th.sortable {
  cursor: pointer;
  user-select: none;
  position: relative;
  padding-right: var(--space-8);
}

.speqq-table th.sortable::after {
  content: '↕';
  position: absolute;
  right: var(--space-4);
  color: var(--text-secondary);
  opacity: 0.5;
  transition: opacity var(--transition-fast), transform var(--transition-bounce);
}

.speqq-table th.sorting-asc::after {
  content: '↑';
  opacity: 1;
  color: var(--accent-primary);
}

.speqq-table th.sorting-desc::after {
  content: '↓';
  opacity: 1;
  color: var(--accent-primary);
}

.speqq-table th.sortable:hover::after {
  opacity: 0.8;
}
```

#### Selectable Rows
```css
.speqq-table tr.selectable {
  cursor: pointer;
}

.speqq-table tr.selected {
  background: linear-gradient(90deg, 
    rgba(127, 90, 240, 0.15), 
    rgba(127, 90, 240, 0.05)
  ) !important;
  box-shadow: inset 3px 0 0 var(--accent-primary);
}

.speqq-table tr.selected td {
  color: var(--text-primary);
}
```

#### Cell Types

```css
/* Status cells */
.speqq-table .cell-status {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.speqq-table .status-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
}

.speqq-table .status-active {
  background-color: var(--success);
  box-shadow: 0 0 8px rgba(44, 182, 125, 0.5);
}

.speqq-table .status-pending {
  background-color: var(--warning);
  box-shadow: 0 0 8px rgba(254, 188, 46, 0.5);
}

.speqq-table .status-error {
  background-color: var(--error);
  box-shadow: 0 0 8px rgba(255, 95, 87, 0.5);
}

/* Action cells */
.speqq-table .cell-actions {
  display: flex;
  gap: var(--space-2);
  justify-content: flex-end;
}

.speqq-table .action-button {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.05);
  color: var(--text-secondary);
  transition: all var(--transition-normal);
  border: none;
  cursor: pointer;
}

.speqq-table .action-button:hover {
  background-color: rgba(127, 90, 240, 0.2);
  color: var(--text-primary);
  transform: translateY(-2px);
}

/* Number/Value cells */
.speqq-table .cell-number {
  text-align: right;
  font-variant-numeric: tabular-nums;
  font-feature-settings: "tnum";
}

/* Progress cells */
.speqq-table .cell-progress {
  position: relative;
}

.speqq-table .progress-bar {
  height: 6px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.speqq-table .progress-value {
  height: 100%;
  background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
  border-radius: var(--radius-full);
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
```

## Advanced Features

### Expandable Rows
```css
.speqq-table tr.expandable {
  cursor: pointer;
}

.speqq-table tr.expandable td:first-child {
  position: relative;
  padding-left: var(--space-8);
}

.speqq-table tr.expandable td:first-child::before {
  content: '+';
  position: absolute;
  left: var(--space-4);
  color: var(--accent-primary);
  transition: transform var(--transition-bounce);
}

.speqq-table tr.expanded td:first-child::before {
  content: '−';
  transform: rotate(90deg);
}

.speqq-table .expanded-content {
  padding: var(--space-6);
  background: linear-gradient(180deg, 
    rgba(30, 30, 35, 0.8), 
    rgba(25, 25, 30, 0.8)
  );
  border-bottom: 1px solid rgba(255, 255, 255, 0.02);
}
```

### Responsive Tables

```css
/* For tables on smaller screens */
@media (max-width: 768px) {
  .speqq-table-responsive {
    display: block;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  
  .speqq-table-stack {
    display: block;
  }
  
  .speqq-table-stack thead {
    display: none;
  }
  
  .speqq-table-stack tbody, 
  .speqq-table-stack tr {
    display: block;
    width: 100%;
  }
  
  .speqq-table-stack tr {
    margin-bottom: var(--space-4);
    background-color: var(--bg-tertiary);
    border-radius: var(--radius-lg);
    overflow: hidden;
    box-shadow: var(--shadow-md);
  }
  
  .speqq-table-stack td {
    display: flex;
    text-align: right;
    justify-content: space-between;
    padding: var(--space-3) var(--space-4);
    border-bottom: 1px solid rgba(255, 255, 255, 0.02);
  }
  
  .speqq-table-stack td::before {
    content: attr(data-label);
    font-weight: 600;
    color: var(--text-primary);
  }
}
```

## Loading States

### Skeleton Loading

```css
.speqq-table-skeleton th {
  height: 24px;
}

.speqq-table-skeleton td {
  height: 40px;
}

.speqq-table-skeleton .skeleton-line {
  height: 16px;
  border-radius: var(--radius-sm);
  background: linear-gradient(90deg, 
    var(--bg-tertiary) 0%, 
    rgba(50, 50, 50, 0.5) 50%, 
    var(--bg-tertiary) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
  width: 80%;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
```

## Applied Examples

### Basic Data Table
```html
<table class="speqq-table speqq-table-striped">
  <thead>
    <tr>
      <th class="sortable sorting-asc">Project</th>
      <th class="sortable">Status</th>
      <th class="sortable">Progress</th>
      <th class="sortable">Deadline</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Website Redesign</td>
      <td class="cell-status">
        <span class="status-indicator status-active"></span>
        Active
      </td>
      <td class="cell-progress">
        <div class="progress-bar">
          <div class="progress-value" style="width: 75%"></div>
        </div>
      </td>
      <td>May 15, 2025</td>
      <td class="cell-actions">
        <button class="action-button">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 12h18M3 6h18M3 18h18"></path>
          </svg>
        </button>
      </td>
    </tr>
    <!-- More rows... -->
  </tbody>
</table>
```

### Interactive Table with Expandable Rows
```html
<table class="speqq-table">
  <thead>
    <tr>
      <th>Client</th>
      <th>Projects</th>
      <th>Total Value</th>
      <th>Last Contact</th>
    </tr>
  </thead>
  <tbody>
    <tr class="expandable">
      <td>Acme Corp</td>
      <td class="cell-number">12</td>
      <td class="cell-number">$245,500</td>
      <td>Yesterday</td>
    </tr>
    <tr class="expanded-content">
      <td colspan="4">
        <div class="glass-card">
          <h3>Recent Activity</h3>
          <p>Latest project update received May 2, 2025</p>
          <!-- Additional details... -->
        </div>
      </td>
    </tr>
    <!-- More rows... -->
  </tbody>
</table>
```

## Design Recommendations

1. **Use subtle animations** - Animate sorting, selection, and expansion with tasteful transitions
2. **Emphasize important data** - Use color and typography to highlight key information
3. **Show status clearly** - Use colored indicators with slight glow effects for status
4. **Keep dense data scannable** - Use alternating row colors and sufficient spacing
5. **Design for long sessions** - Low contrast colors to reduce eye strain
6. **Provide clear affordances** - Make interactive elements obvious with hover effects
7. **Optimize for different screen sizes** - Use responsive patterns for mobile views
8. **Include meaningful empty states** - Design placeholders when no data is available

These table designs maintain the sophisticated dark mode aesthetic of your Speqq application while ensuring data remains readable and interactions feel premium and polished.