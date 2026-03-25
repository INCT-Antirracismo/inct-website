'use client';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarHeader,
  SidebarRail,
  SidebarMenu,
  SidebarMenuSub,
  SidebarMenuItem,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarMenuButton,
  useSidebar
} from '@/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from './ui/collapsible';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { createDynamicContentURL } from '@/lib/utils/createDynamicContentURL';

export type NavSidebarProps = { menu: any };
const data = {
  navMain: [
    {
      title: 'Getting Started',
      url: '#',
      items: [
        {
          title: 'Installation',
          url: '#'
        },
        {
          title: 'Project Structure',
          url: '#'
        }
      ]
    },
    {
      title: 'Build Your Application',
      url: '#',
      items: [
        {
          title: 'Routing',
          url: '#'
        },
        {
          title: 'Data Fetching',
          url: '#',
          isActive: true
        },
        {
          title: 'Rendering',
          url: '#'
        },
        {
          title: 'Caching',
          url: '#'
        },
        {
          title: 'Styling',
          url: '#'
        },
        {
          title: 'Optimizing',
          url: '#'
        },
        {
          title: 'Configuring',
          url: '#'
        },
        {
          title: 'Testing',
          url: '#'
        },
        {
          title: 'Authentication',
          url: '#'
        },
        {
          title: 'Deploying',
          url: '#'
        },
        {
          title: 'Upgrading',
          url: '#'
        },
        {
          title: 'Examples',
          url: '#'
        }
      ]
    },
    {
      title: 'API Reference',
      url: '#',
      items: [
        {
          title: 'Components',
          url: '#'
        },
        {
          title: 'File Conventions',
          url: '#'
        },
        {
          title: 'Functions',
          url: '#'
        },
        {
          title: 'next.config.js Options',
          url: '#'
        },
        {
          title: 'CLI',
          url: '#'
        },
        {
          title: 'Edge Runtime',
          url: '#'
        }
      ]
    },
    {
      title: 'Architecture',
      url: '#',
      items: [
        {
          title: 'Accessibility',
          url: '#'
        },
        {
          title: 'Fast Refresh',
          url: '#'
        },
        {
          title: 'Next.js Compiler',
          url: '#'
        },
        {
          title: 'Supported Browsers',
          url: '#'
        },
        {
          title: 'Turbopack',
          url: '#'
        }
      ]
    },
    {
      title: 'Community',
      url: '#',
      items: [
        {
          title: 'Contribution Guide',
          url: '#'
        }
      ]
    }
  ]
};
export default function NavSidebar({ menu: mainMenu }: NavSidebarProps) {
  const { toggleSidebar } = useSidebar();
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {mainMenu.map((menu: any) => (
              <SidebarMenuItem key={menu.label + 'sidebar'}>
                <SidebarMenuButton asChild>
                  <Link
                    href={
                      menu.items && menu.items!.length > 0
                        ? createDynamicContentURL(
                            (menu.items![0].link!.internalContent as any).value
                              .slug,
                            (menu.items![0].link!.internalContent as any)
                              .relationTo
                          )
                        : '#'
                    }
                    className="font-medium text-xs uppercase tracking-widest text-deep-sea-green"
                    onClick={toggleSidebar}
                  >
                    {menu.label}
                  </Link>
                </SidebarMenuButton>
                {menu.items?.length ? (
                  <SidebarMenuSub>
                    {menu.items?.map((item: any) => (
                      <SidebarMenuSubItem
                        key={menu.label + item.link!.internalContent!.value!.id}
                      >
                        <SidebarMenuSubButton asChild>
                          <Link
                            href={createDynamicContentURL(
                              item.link!.internalContent.value.slug,
                              item.link!.internalContent.relationTo
                            )}
                            onClick={toggleSidebar}
                            className="text-sm font-medium"
                          >
                            {item.link.linkType === 'internal'
                              ? item.link!.internalContent!.value!.acronym ||
                                item.link!.internalContent!.value!.name
                              : 'Link Externo'}
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
