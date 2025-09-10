"use client";

import React, { useState } from 'react';
import menuConfig from '../config.json';

interface MenuItem {
  id: string;
  label: string;
  href?: string;
  icon?: string;
  description?: string;
  group?: string;
  role?: string;
  children?: MenuItem[];
}

// Build complete menu structure for hierarchical navigation
const buildMenuStructure = (items: MenuItem[]) => {
  return items.map(item => ({
    ...item,
    children: item.children || []
  }));
};

const menuStructure = buildMenuStructure(menuConfig as MenuItem[]);

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [activeItem, setActiveItem] = useState<string>('');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const getActiveItemLabel = (): string | null => {
    for (const section of menuStructure) {
      if (section.id === activeItem) return section.label;
      if (section.children) {
        for (const child of section.children) {
          if (child.id === activeItem) return child.label;
        }
      }
    }
    return null;
  };

  const handleMenuClick = (item: MenuItem) => {
    if (item.href) {
      setActiveItem(item.id);
      console.log(`Navigation to: ${item.href}`);
    } else if (item.children && item.children.length > 0) {
      // Toggle section expansion
      const newExpanded = new Set(expandedSections);
      if (newExpanded.has(item.id)) {
        newExpanded.delete(item.id);
      } else {
        newExpanded.add(item.id);
      }
      setExpandedSections(newExpanded);
    }
  };

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const isExpanded = expandedSections.has(item.id);
    const hasChildren = item.children && item.children.length > 0;
    const isActive = activeItem === item.id;
    
    return (
      <li key={item.id} style={{ marginBottom: level === 0 ? '12px' : '4px' }}>
        <button
          onClick={() => handleMenuClick(item)}
          style={{
            width: '100%',
            textAlign: 'left',
            padding: level === 0 ? '12px' : '8px 12px 8px 24px',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s',
            backgroundColor: isActive ? '#dbeafe' : 'transparent',
            color: isActive ? '#1d4ed8' : level === 0 ? '#1f2937' : '#6b7280',
            fontWeight: level === 0 ? '600' : isActive ? '500' : 'normal',
            fontSize: level === 0 ? '16px' : '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <span>{item.label}</span>
          {hasChildren && (
            <span style={{ 
              transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s',
              fontSize: '12px'
            }}>
              ▶
            </span>
          )}
        </button>
        
        {hasChildren && isExpanded && (
          <ul style={{ 
            listStyle: 'none', 
            padding: '4px 0 0 0', 
            margin: '0'
          }}>
            {item.children!.map(child => renderMenuItem(child, level + 1))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Sidebar */}
      <aside style={{ 
        width: '280px', 
        backgroundColor: 'white', 
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' 
      }}>
        <div style={{ 
          padding: '16px', 
          borderBottom: '1px solid #e5e7eb' 
        }}>
          <h1 style={{ 
            fontSize: '20px', 
            fontWeight: '600', 
            color: '#1f2937',
            margin: '0 0 4px 0'
          }}>
            PMBook
          </h1>
          <p style={{ 
            fontSize: '14px', 
            color: '#6b7280',
            margin: '0'
          }}>
            Strategic Operations
          </p>
        </div>
        
        <nav style={{ padding: '16px' }}>
          <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
            {menuStructure.map((item) => renderMenuItem(item))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ flex: '1', overflow: 'auto' }}>
        <div style={{ padding: '24px' }}>
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '8px', 
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', 
            padding: '24px' 
          }}>
            <h2 style={{ 
              fontSize: '24px', 
              fontWeight: '600', 
              marginBottom: '16px', 
              color: '#1f2937' 
            }}>
              {getActiveItemLabel() || 'PMBook Dashboard'}
            </h2>
            <div style={{ color: '#6b7280' }}>
              <p>Selected: <strong>{activeItem || 'None'}</strong></p>
              <p style={{ marginTop: '8px' }}>This is a basic layout for testing navigation.</p>
              <p style={{ marginTop: '4px' }}>Click menu sections to expand and navigate.</p>
              <div style={{ marginTop: '16px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '500', marginBottom: '8px', color: '#1f2937' }}>
                  Available Sections:
                </h3>
                <ul style={{ margin: '0', paddingLeft: '20px' }}>
                  {menuStructure.map(section => (
                    <li key={section.id} style={{ marginBottom: '4px' }}>
                      <strong>{section.label}</strong> - {section.description}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}