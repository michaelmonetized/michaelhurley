"use client";

import * as React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const paginationComponents = `Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious`
  .split(",")
  .map((component) => component.trim());

export default function PaginationExample() {
  const [paginationDemoCurrent, setPaginationDemoCurrent] = React.useState(0);

  const paginationDemoPages = [
    {
      id: "pagination-overview",
      title: "Overview",
      description:
        "The pagination component suite is used to navigate between pages of content.",
      children: (
        <ul>
          {paginationComponents.map((component, index) => (
            <li key={component}>
              <a onClick={() => setPaginationDemoCurrent(index)}>{component}</a>
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: "pagination-pagination",
      title: "Pagination",
      description:
        "The Pagination component is used to wrap the pagination items.",
      children: (
        <>
          <h4>Props:</h4>
          <ul>
            <li>
              className defailt: &quot;mx-auto flex w-full justify-center&quot;
            </li>
            <li>...props: React.ComponentProps&lt;&quot;nav&quot;&gt;</li>
          </ul>
        </>
      ),
    },
    {
      id: "pagination-content",
      title: "Content",
      description:
        "The pagination content component is used to wrap the pagination items.",
      children: (
        <>
          <h4>Props:</h4>
          <ul>
            <li>className defailt: &quot;flex items-center gap-0.5&quot;</li>
            <li>...props: React.ComponentProps&lt;&quot;ul&quot;&gt;</li>
          </ul>
        </>
      ),
    },
    {
      id: "pagination-ellipsis",
      title: "Ellipsis",
      description:
        "The pagination ellipsis component is used to indicate that there are more pages to navigate to.",
      children: (
        <>
          <h4>Props:</h4>
          <ul>
            <li>
              className defailt:
              {
                "&quot;flex size-8 items-center justify-center [&_svg:not([class*='size-'])]:size-4&quot;"
              }
            </li>
            <li>...props: React.ComponentProps&lt;&quot;span&quot;&gt;</li>
          </ul>
        </>
      ),
    },
    {
      id: "pagination-item",
      title: "Item",
      description:
        "The pagination item component is used to wrap the pagination links.",
      children: (
        <>
          <h4>Props:</h4>
          <ul>
            <li>
              className defailt: &quot;mx-auto flex w-full justify-center&quot;
            </li>
            <li>...props: React.ComponentProps&lt;&quot;li&quot;&gt;</li>
          </ul>
        </>
      ),
    },
    {
      id: "pagination-link",
      title: "Link",
      description:
        "The pagination link component is used to wrap the pagination links.",
      children: (
        <>
          <h4>Props:</h4>
          <ul>
            <li>className</li>
            <li>isActive?: boolean</li>
            <li>
              ...props: Pick&lt;React.ComponentProps&lt;typeof Button&gt;,
              &quot;size&quot;&gt; &amp;
              React.ComponentProps&lt;&quot;a&quot;&gt;
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "pagination-next",
      title: "Next",
      description:
        "The pagination next component is used to navigate to the next page.",
      children: (
        <>
          <h4>Props:</h4>
          <ul>
            <li>className defailt: &quot;pr-1.5!&quot;</li>
            <li>text?: string</li>
            <li>{"...props: React.ComponentProps<typeof PaginationLink>"}</li>
          </ul>
        </>
      ),
    },
    {
      id: "pagination-previous",
      title: "Previous",
      description:
        "The pagination previous component is used to navigate to the previous page.",
      children: (
        <>
          <h4>Props:</h4>
          <ul>
            <li>className defailt: &quot;pl-1.5!&quot;</li>
            <li>text?: string</li>
            <li>{"...props: React.ComponentProps<typeof PaginationLink>"}</li>
          </ul>
        </>
      ),
    },
  ];

  return (
    <>
      <div id="pagination-demo">
        {paginationDemoPages.map((page, index) => (
          <div
            key={page.id}
            className={
              index === paginationDemoCurrent ? "block" : "hidden"
            }
          >
            <h3>{page.title}</h3>
            <p>{page.description}</p>
            {page.children}
          </div>
        ))}
      </div>
      <Pagination>
        <PaginationContent>
          {paginationDemoCurrent !== 0 && (
            <PaginationItem>
              <PaginationPrevious
                onClick={() =>
                  setPaginationDemoCurrent(paginationDemoCurrent - 1)
                }
              />
            </PaginationItem>
          )}

          {paginationDemoPages.map((page, index) => (
            <PaginationItem key={page.id}>
              <PaginationLink
                onClick={() => setPaginationDemoCurrent(index)}
                isActive={paginationDemoCurrent === index}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>

          {paginationDemoCurrent !==
            paginationDemoPages.length - 1 && (
            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setPaginationDemoCurrent(paginationDemoCurrent + 1)
                }
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </>
  );
}
