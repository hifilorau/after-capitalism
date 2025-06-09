/*
 * Helper functions to parse WordPress content into structured data
 */

// Extract event information from an HTML element
const extractEventData = (element, isActivity = false) => {
  const event = {
    title: '',
    date: '',
    description: '',
    link: null,
    image: null,
    htmlContent: element.innerHTML,
    type: isActivity ? 'activity' : 'event'
  };

  // Extract title
  if (isActivity) {
    // For activities, look for Article: or Review: pattern
    const paragraphs = element.querySelectorAll('p');
    let foundTitle = false;
    
    // First try to find a paragraph with Article: or Review: pattern
    for (let i = 0; i < paragraphs.length && !foundTitle; i++) {
      const text = paragraphs[i].textContent;
      const articleMatch = text.match(/Article[:\s]+([^\n.]+)[.\n]/i);
      const reviewMatch = text.match(/Review[:\s]+([^\n.]+)[.\n]/i);
      
      if (articleMatch && articleMatch[1]) {
        event.title = articleMatch[1].trim();
        event.activityType = 'Article';
        foundTitle = true;
      } else if (reviewMatch && reviewMatch[1]) {
        event.title = reviewMatch[1].trim();
        event.activityType = 'Review';
        foundTitle = true;
      }
    }
    
    // If no title found yet, try h4 or strong tag
    if (!foundTitle) {
      const h4 = element.querySelector('h4');
      const strong = element.querySelector('strong');
      if (h4) {
        // Clean up any HTML tags in the title
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = h4.innerHTML;
        event.title = tempDiv.textContent.trim();
      } else if (strong) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = strong.innerHTML;
        event.title = tempDiv.textContent.trim();
      }
    }
  } else {
    // For events, use h4 or strong tag
    const h4 = element.querySelector('h4');
    const strong = element.querySelector('strong');
    if (h4) {
      // Clean up any HTML tags in the title
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = h4.innerHTML;
      event.title = tempDiv.textContent.trim();
    } else if (strong) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = strong.innerHTML;
      event.title = tempDiv.textContent.trim();
    }
  }

  // Date - match dates with or without year
  const dateRegex = /(\d{1,2}\/\d{1,2}\/\d{4}|\w+ \d{1,2},? \d{4}|\w+ \d{1,2})/;
  const dateMatch = element.textContent.match(dateRegex);
  if (dateMatch) event.date = dateMatch[0];

  // Description
  if (!isActivity) {
    // For events, include the full text content
    event.description = element.textContent.trim();
  } else {
    // For activities, be more selective with paragraphs
    const paragraphs = element.querySelectorAll('p');
    if (paragraphs.length > 0) {
      const descriptionParts = [];
      
      for (let i = 0; i < paragraphs.length; i++) {
        const p = paragraphs[i];
        // Skip paragraphs that only contain images
        if (p.querySelector('img') && p.textContent.trim() === '') continue;
        
        // Skip paragraphs that contain the title or date (to avoid redundancy)
        if (event.title && p.textContent.includes(event.title)) continue;
        if (event.date && p.textContent.includes(event.date)) continue;
        
        descriptionParts.push(p.textContent.trim());
      }
      
      event.description = descriptionParts.join('\n');
    }
  }

  // Process images with better handling
  const imageElements = element.querySelectorAll('img');
  if (imageElements.length > 0) {
    // Use the first image found
    const imgElement = imageElements[0];
    event.image = { 
      src: imgElement.src, 
      alt: imgElement.alt || event.title,
      width: imgElement.getAttribute('width') || 500,
      height: imgElement.getAttribute('height') || 300
    };
  }

  // Links
  const linkElements = element.querySelectorAll('a');
  if (linkElements.length > 0) {
    event.link = { url: linkElements[0].href, text: linkElements[0].textContent.trim() || 'Read more' };
    event.links = Array.from(linkElements).map(link => ({ url: link.href, text: link.textContent.trim() || 'Read more' }));
  }

  return event;
};

// Parse WordPress HTML content into structured data
const parseNewsContent = (htmlContent) => {
  if (!htmlContent || typeof window === 'undefined') return { upcomingEvents: [], recentActivities: [] };
  
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    
    // First, look for sections by heading text
    let upcomingEventsSection = null;
    let recentActivitiesSection = null;
    
    // Find headings that match our sections
    const headings = doc.querySelectorAll('h3');
    headings.forEach(heading => {
      const text = heading.textContent.trim().toUpperCase();
      if (text.includes('UPCOMING EVENTS')) {
        // Create a section for upcoming events
        upcomingEventsSection = document.createElement('div');
        upcomingEventsSection.setAttribute('data-section', 'upcoming-events');
        upcomingEventsSection.appendChild(heading.cloneNode(true));
        
        // Add content until we hit another h3
        let currentNode = heading.nextElementSibling;
        while (currentNode && currentNode.tagName !== 'H3') {
          upcomingEventsSection.appendChild(currentNode.cloneNode(true));
          currentNode = currentNode.nextElementSibling;
        }
      } else if (text.includes('RECENT ACTIVITIES') || text.includes('RECENT ACTIVITY')) {
        // Create a section for recent activities
        recentActivitiesSection = document.createElement('div');
        recentActivitiesSection.setAttribute('data-section', 'recent-activities');
        recentActivitiesSection.appendChild(heading.cloneNode(true));
        
        // Add content until we hit another h3 or end of content
        let currentNode = heading.nextElementSibling;
        while (currentNode) {
          if (currentNode.tagName === 'H3') break;
          recentActivitiesSection.appendChild(currentNode.cloneNode(true));
          currentNode = currentNode.nextElementSibling;
        }
      }
    });
    
    // If we couldn't find sections by headings, try looking for data attributes
    if (!upcomingEventsSection) {
      const upcomingSection = doc.querySelector('[data-section="upcoming-events"]');
      if (upcomingSection) upcomingEventsSection = upcomingSection;
    }
    
    if (!recentActivitiesSection) {
      const recentSection = doc.querySelector('[data-section="recent-activities"]');
      if (recentSection) recentActivitiesSection = recentSection;
    }

    // --- UPCOMING EVENTS ---
    const upcomingEvents = [];
    if (upcomingEventsSection) {
      // Process events by looking for h4 or paragraphs with strong tags or dates
      const nodes = upcomingEventsSection.children;
      let eventBlock = null;
      let isFirstHeading = true;
      
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        
        // Skip the section heading (h3)
        if (node.tagName === 'H3' && isFirstHeading) {
          isFirstHeading = false;
          continue;
        }
        
        const isNewEvent = node.tagName === 'H4' ||
          (node.tagName === 'P' && (node.querySelector('strong') || node.textContent.match(/\d{1,2}\/\d{1,2}\/\d{4}|\w+ \d{1,2},? \d{4}|\w+ \d{1,2}/)));
        
        if (isNewEvent) {
          if (eventBlock && eventBlock.childNodes.length > 0) {
            const eventData = extractEventData(eventBlock);
            if (eventData.title || eventData.date || eventData.description) {
              upcomingEvents.push(eventData);
            }
          }
          eventBlock = document.createElement('div');
        }
        
        if (eventBlock) eventBlock.appendChild(node.cloneNode(true));
      }
      
      // Don't forget the last event block
      if (eventBlock && eventBlock.childNodes.length > 0) {
        const eventData = extractEventData(eventBlock);
        if (eventData.title || eventData.date || eventData.description) {
          upcomingEvents.push(eventData);
        }
      }
    }

    // --- RECENT ACTIVITIES ---
    const recentActivities = [];
    const seenActivityTitles = new Set(); // Track seen titles to prevent duplicates
    
    if (recentActivitiesSection) {
      // Process activities by looking for h4 or paragraphs with strong tags or dates
      const nodes = recentActivitiesSection.children;
      let activityBlock = null;
      let isFirstHeading = true;
      
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        
        // Skip the section heading (h3)
        if (node.tagName === 'H3' && isFirstHeading) {
          isFirstHeading = false;
          continue;
        }
        
        // Check for patterns that indicate a new activity
        const isNewActivity = 
          node.tagName === 'H4' ||
          (node.tagName === 'P' && (
            node.querySelector('strong') || 
            node.textContent.match(/\d{1,2}\/\d{1,2}\/\d{4}|\w+ \d{1,2},? \d{4}|\w+ \d{1,2}/) ||
            node.textContent.match(/Article[:\s]+|Review[:\s]+/i)
          ));
        
        if (isNewActivity) {
          if (activityBlock && activityBlock.childNodes.length > 0) {
            const activityData = extractEventData(activityBlock, true);
            
            // Only add if we have meaningful content and haven't seen this title before
            if ((activityData.title || activityData.description) && 
                (!activityData.title || !seenActivityTitles.has(activityData.title))) {
              
              // Add to seen titles if we have a title
              if (activityData.title) {
                seenActivityTitles.add(activityData.title);
              }
              
              recentActivities.push(activityData);
            }
          }
          activityBlock = document.createElement('div');
        }
        
        if (activityBlock) activityBlock.appendChild(node.cloneNode(true));
      }
      
      // Don't forget the last activity block
      if (activityBlock && activityBlock.childNodes.length > 0) {
        const activityData = extractEventData(activityBlock, true);
        
        // Only add if we have meaningful content and haven't seen this title before
        if ((activityData.title || activityData.description) && 
            (!activityData.title || !seenActivityTitles.has(activityData.title))) {
          recentActivities.push(activityData);
        }
      }
    }
    
    console.log('Parsed content:', { upcomingEvents, recentActivities });
    return { upcomingEvents, recentActivities };
  } catch (e) {
    console.error('Error parsing news content:', e);
    return { upcomingEvents: [], recentActivities: [] };
  }
};

export { extractEventData, parseNewsContent };
