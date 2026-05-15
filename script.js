document.addEventListener('DOMContentLoaded', () => {
    // Dynamic Year Content Logic
    const urlParams = new URLSearchParams(window.location.search);
    const year = urlParams.get('year') || '1';
    
    if (year) {
        // Update Profile Pic in Navbar
        const navProfile = document.querySelector('.nav-profile');
        if (navProfile) navProfile.src = `assets/profile_${year}.png`;

        // Update Hero Title
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            heroTitle.innerHTML = `Season ${year} ❤️`;
        }
        const heroSeasonNumDisplay = document.getElementById('heroSeasonNumDisplay');
        if (heroSeasonNumDisplay) {
            heroSeasonNumDisplay.textContent = year;
        }

        // Update Banner Video
        const bannerVideo = document.querySelector('.hero-bg-video');
        if (bannerVideo) bannerVideo.src = `assets/year${year}/banner_video.mp4`;

        // Update Main Modal Video
        const mainFeatureVideo = document.getElementById('mainFeatureVideo');
        if (mainFeatureVideo) mainFeatureVideo.src = `assets/year${year}/main_feature.mp4`;

        // 2. Load Dynamic Content (Images and Hover Videos)
        const posters = document.querySelectorAll('.row-poster');
        const hoverVideos = document.querySelectorAll('.row-video');

        if (posters.length > 0) {
            posters.forEach((poster, index) => {
                if (poster.classList.contains('blurred')) return;

                const num = index + 1;
                const extensions = ['png', 'jpg', 'jpeg'];
                let currentExtIndex = 0;

                const tryLoadImage = () => {
                    if (currentExtIndex < extensions.length) {
                        poster.src = `assets/year${year}/card_${num}.${extensions[currentExtIndex]}`;
                        currentExtIndex++;
                    } else {
                        // All extensions failed, hide this card
                        poster.closest('.row-poster-container').style.display = 'none';
                    }
                };

                poster.onerror = tryLoadImage;
                tryLoadImage(); // Start first attempt
            });

            hoverVideos.forEach((video, index) => {
                video.src = `assets/year${year}/hover_video_${index + 1}.mp4`;
            });
        }
        
        // Show Coming Soon Row only for Year 4
        const comingSoonRow = document.getElementById('comingSoonRow');
        if (comingSoonRow && year === '4') {
            comingSoonRow.style.display = 'block';
        }
    }

    // 2. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }, { passive: true });
    }

    // 3. Horizontal Scroll with Mouse Wheel / Swipe
    const rows = document.querySelectorAll('.row-posters');
    rows.forEach(row => {
        row.addEventListener('wheel', (e) => {
            if (e.deltaY !== 0) {
                e.preventDefault();
                row.scrollLeft += e.deltaY * 2;
            }
        }, { passive: false }); // Needs false for preventDefault, but we can optimize the math

        // Add touch swipe support for desktop/mobile consistency
        let isDown = false;
        let startX;
        let scrollLeft;

        row.addEventListener('mousedown', (e) => {
            isDown = true;
            row.classList.add('active');
            startX = e.pageX - row.offsetLeft;
            scrollLeft = row.scrollLeft;
        });
        row.addEventListener('mouseleave', () => {
            isDown = false;
            row.classList.remove('active');
        });
        row.addEventListener('mouseup', () => {
            isDown = false;
            row.classList.remove('active');
        });
        row.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - row.offsetLeft;
            const walk = (x - startX) * 2; // scroll-fast
            row.scrollLeft = scrollLeft - walk;
        });
    });

    // 4. Video Hover Logic for Posters
    const posterContainers = document.querySelectorAll('.row-poster-container');
    posterContainers.forEach(container => {
        const video = container.querySelector('.row-video');
        if (video) {
            let playTimeout;
            container.addEventListener('mouseenter', () => {
                // Add a small delay like Netflix before playing
                playTimeout = setTimeout(() => {
                    video.play().catch(e => console.log('Autoplay prevented:', e));
                }, 400);
            });
            container.addEventListener('mouseleave', () => {
                clearTimeout(playTimeout);
                video.pause();
                video.currentTime = 0; // reset
            });
        }
    });

    // 4. Play Button Action (Modal)
    const playButton = document.querySelector('.btn-play');
    const modal = document.getElementById('videoModal');
    const closeModal = document.querySelector('.close-modal');
    const mainFeatureVideo = document.getElementById('mainFeatureVideo');

    if (playButton && modal && closeModal) {
        playButton.addEventListener('click', () => {
            modal.classList.add('show');
            // Request Fullscreen before playing
            if (mainFeatureVideo.requestFullscreen) {
                mainFeatureVideo.requestFullscreen();
            } else if (mainFeatureVideo.webkitRequestFullscreen) { /* Safari */
                mainFeatureVideo.webkitRequestFullscreen();
            } else if (mainFeatureVideo.msRequestFullscreen) { /* IE11 */
                mainFeatureVideo.msRequestFullscreen();
            }
            
            // Try playing the main video
            mainFeatureVideo.play().catch(e => console.log('Video play failed or file missing:', e));
        });

        // Listen for fullscreen exit to close modal automatically
        document.addEventListener('fullscreenchange', () => {
            if (!document.fullscreenElement) {
                hideModal();
            }
        });

        const hideModal = () => {
            modal.classList.remove('show');
            mainFeatureVideo.pause();
        };

        closeModal.addEventListener('click', hideModal);
        
        // Close when clicking outside the video
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                hideModal();
            }
        });
    }

    const infoButton = document.querySelector('.btn-info');
    if (infoButton) {
        infoButton.addEventListener('click', () => {
            alert('More Info: A collection of beautiful memories and trips. ❤️');
        });
    }

    // 5. Image Lightbox Modal & Wishlist Logic
    const imageModal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const closeImageModalBtn = document.querySelector('.close-image-modal');
    
    // Wishlist states
    const savedItems = new Set();
    const myListCount = document.getElementById('myListCount');
    const myListCountMobile = document.getElementById('myListCountMobile');
    const myListGrid = document.getElementById('myListGrid');
    
    const updateMyListUI = () => {
        if (myListCount) myListCount.textContent = savedItems.size;
        if (myListCountMobile) myListCountMobile.textContent = savedItems.size;
        const myListCountSidebar = document.getElementById('myListCountSidebar');
        if (myListCountSidebar) myListCountSidebar.textContent = savedItems.size;
        
        if (savedItems.size === 0) {
            myListGrid.innerHTML = '<p class="empty-list-msg">Your list is empty. Click the hearts on pictures to add them here!</p>';
        } else {
            myListGrid.innerHTML = '';
            savedItems.forEach(src => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'list-item-container';
                const img = document.createElement('img');
                img.src = src;
                img.className = 'list-item-img';
                
                // Allow viewing from wishlist
                itemDiv.addEventListener('click', () => {
                    if (imageModal && modalImage) {
                        modalImage.src = src;
                        imageModal.classList.add('show');
                        if (imageModal.requestFullscreen) {
                            imageModal.requestFullscreen().catch(e => console.log(e));
                        } else if (imageModal.webkitRequestFullscreen) {
                            imageModal.webkitRequestFullscreen();
                        }
                    }
                });

                // Remove button
                const removeBtn = document.createElement('div');
                removeBtn.className = 'remove-btn';
                removeBtn.innerHTML = '❌';
                removeBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    savedItems.delete(src);
                    updateMyListUI();
                    
                    // Un-toggle original heart
                    const posters = document.querySelectorAll('.row-poster');
                    posters.forEach(poster => {
                        // Check exact or relative src matching
                        if (poster.src === src || poster.src.endsWith(src)) {
                            const container = poster.closest('.row-poster-container');
                            if (container) {
                                const heart = container.querySelector('.heart-btn');
                                if (heart) {
                                    heart.innerHTML = '🤍';
                                    heart.classList.remove('liked');
                                }
                            }
                        }
                    });
                });

                itemDiv.appendChild(img);
                itemDiv.appendChild(removeBtn);
                myListGrid.appendChild(itemDiv);
            });
        }
    };

    if (imageModal && modalImage && closeImageModalBtn) {
        posterContainers.forEach(container => {
            if (container.classList.contains('coming-soon')) return;

            // Create Heart Button Feature
            const heartBtn = document.createElement('div');
            heartBtn.className = 'heart-btn';
            heartBtn.innerHTML = '🤍';
            container.appendChild(heartBtn);

            const img = container.querySelector('.row-poster');

            heartBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent opening the picture in full screen
                if (!img) return;
                const imgSrc = img.src;

                if (heartBtn.innerHTML === '🤍') {
                    heartBtn.innerHTML = '❤️';
                    heartBtn.classList.add('liked');
                    savedItems.add(imgSrc);
                } else {
                    heartBtn.innerHTML = '🤍';
                    heartBtn.classList.remove('liked');
                    savedItems.delete(imgSrc);
                }
                updateMyListUI();
            });

            container.addEventListener('click', () => {
                if(img) {
                    modalImage.src = img.src;
                    imageModal.classList.add('show');
                    
                    // Force Native Fullscreen for the picture
                    if (imageModal.requestFullscreen) {
                        imageModal.requestFullscreen().catch(e => console.log(e));
                    } else if (imageModal.webkitRequestFullscreen) {
                        imageModal.webkitRequestFullscreen();
                    }
                }
            });
        });

        const hideImageModal = () => {
            imageModal.classList.remove('show');
            if (document.fullscreenElement) {
                document.exitFullscreen().catch(e => console.log(e));
            }
        };

        // Listen for escape key / exiting fullscreen natively
        document.addEventListener('fullscreenchange', () => {
            if (!document.fullscreenElement && imageModal.classList.contains('show')) {
                hideImageModal();
            }
        });

        closeImageModalBtn.addEventListener('click', hideImageModal);
        imageModal.addEventListener('click', (e) => {
            if (e.target === imageModal || (e.target.closest('.image-wrapper') && e.target.id !== 'modalImage')) {
                hideImageModal();
            }
        });
    }

    // 6. My List Modal Logic
    const myListModal = document.getElementById('myListModal');
    const myListBtn = document.getElementById('myListBtn');
    const myListBtnMobile = document.getElementById('myListBtnMobile');
    const closeListModalBtn = document.querySelector('.close-list-modal');

    if (myListModal && closeListModalBtn) {
        const showListModal = (e) => {
            if(e) e.preventDefault();
            myListModal.classList.add('show');
        };
        
        if (myListBtn) myListBtn.addEventListener('click', showListModal);
        if (myListBtnMobile) myListBtnMobile.addEventListener('click', showListModal);
        const myListBtnSidebar = document.getElementById('myListBtnSidebar');
        if (myListBtnSidebar) myListBtnSidebar.addEventListener('click', showListModal);

        const hideListModal = () => {
            myListModal.classList.remove('show');
        };

        closeListModalBtn.addEventListener('click', hideListModal);
        
        myListModal.addEventListener('click', (e) => {
            if (e.target === myListModal) {
                hideListModal();
            }
        });
    }

    // 7. Mobile Sidebar Logic
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const mobileSidebar = document.getElementById('mobileSidebar');
    const closeSidebar = document.getElementById('closeSidebar');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');

    if (hamburgerMenu && mobileSidebar && closeSidebar) {
        hamburgerMenu.addEventListener('click', () => {
            mobileSidebar.classList.add('active');
        });

        const hideSidebar = () => {
            mobileSidebar.classList.remove('active');
        };

        closeSidebar.addEventListener('click', hideSidebar);

        // Close sidebar when a link is clicked
        sidebarLinks.forEach(link => {
            link.addEventListener('click', () => {
                hideSidebar();
            });
        });
    }

    // 8. Dedicated Single-Season Note Management Logic
    const defaultNotes = {
        '1': 'Where our beautiful story began. Filled with butterflies, long late-night talks, and magical first dates. ❤️',
        '2': 'Growing closer every single day. Unforgettable movie nights, deeper understanding, and endless laughter. ✨',
        '3': 'Adventures, beautiful trips together, and building unforgettable memories that will last a lifetime. 🌟',
        '4': 'Our unbreakable bond. Looking forward to a brilliant future and writing the next seasons of our lives together. 💍'
    };

    const seasonNoteTitle = document.getElementById('seasonNoteTitle');
    const activeSeasonNoteDisplay = document.getElementById('activeSeasonNoteDisplay');
    const activeSeasonTextarea = document.getElementById('activeSeasonTextarea');
    const editNoteToggleBtn = document.getElementById('editNoteToggleBtn');
    const seasonNoteEditArea = document.getElementById('seasonNoteEditArea');
    const saveActiveSeasonBtn = document.getElementById('saveActiveSeasonBtn');
    const cancelEditSeasonBtn = document.getElementById('cancelEditSeasonBtn');
    const saveSeasonStatus = document.getElementById('saveSeasonStatus');

    if (seasonNoteTitle && activeSeasonNoteDisplay) {
        // Set dynamic contextual heading
        seasonNoteTitle.innerHTML = `Special Message for Season ${year} ❤️`;

        // Load specific season note without merging
        const currentNoteKey = `custom_note_year_${year}`;
        const savedNote = localStorage.getItem(currentNoteKey);
        const displayNote = savedNote || defaultNotes[year] || defaultNotes['1'];

        activeSeasonNoteDisplay.textContent = `"${displayNote}"`;
        if (activeSeasonTextarea) {
            activeSeasonTextarea.value = displayNote;
        }

        // Toggle edit interface smoothly
        if (editNoteToggleBtn && seasonNoteEditArea) {
            editNoteToggleBtn.addEventListener('click', () => {
                seasonNoteEditArea.style.display = 'block';
                if (activeSeasonTextarea) activeSeasonTextarea.focus();
            });
        }

        if (cancelEditSeasonBtn && seasonNoteEditArea) {
            cancelEditSeasonBtn.addEventListener('click', () => {
                seasonNoteEditArea.style.display = 'none';
                // Reset textarea to currently saved/default note
                if (activeSeasonTextarea) {
                    activeSeasonTextarea.value = localStorage.getItem(currentNoteKey) || defaultNotes[year] || defaultNotes['1'];
                }
            });
        }

        // Save customized message specifically for active season
        if (saveActiveSeasonBtn && saveSeasonStatus) {
            saveActiveSeasonBtn.addEventListener('click', () => {
                if (activeSeasonTextarea) {
                    const newText = activeSeasonTextarea.value.trim();
                    if (newText) {
                        localStorage.setItem(currentNoteKey, newText);
                        activeSeasonNoteDisplay.textContent = `"${newText}"`;
                        const seasonNotePopupText = document.getElementById('seasonNotePopupText');
                        if (seasonNotePopupText) seasonNotePopupText.textContent = `"${newText}"`;
                    } else {
                        // Revert to default if empty
                        localStorage.removeItem(currentNoteKey);
                        activeSeasonNoteDisplay.textContent = `"${defaultNotes[year]}"`;
                        activeSeasonTextarea.value = defaultNotes[year];
                        const seasonNotePopupText = document.getElementById('seasonNotePopupText');
                        if (seasonNotePopupText) seasonNotePopupText.textContent = `"${defaultNotes[year]}"`;
                    }
                }

                saveSeasonStatus.style.opacity = '1';
                setTimeout(() => {
                    saveSeasonStatus.style.opacity = '0';
                    if (seasonNoteEditArea) seasonNoteEditArea.style.display = 'none';
                }, 1500);
            });
        }

        // Cinematic popup modal implementation triggered specifically from dashboard button
        const openCinematicNoteBtn = document.getElementById('openCinematicNoteBtn');
        const seasonNoteModal = document.getElementById('seasonNoteModal');
        const seasonNoteBox = document.getElementById('seasonNoteBox');
        const seasonNoteAvatar = document.getElementById('seasonNoteAvatar');
        const seasonNotePopupTitle = document.getElementById('seasonNotePopupTitle');
        const seasonNotePopupText = document.getElementById('seasonNotePopupText');
        const closeSeasonNoteModalBtn = document.getElementById('closeSeasonNoteModalBtn');
        const seasonNoteMusicPlayer = document.getElementById('seasonNoteMusicPlayer');

        let heartFallTimer = null;

        const spawnBoxHeart = () => {
            if (!seasonNoteBox) return;
            const heart = document.createElement('span');
            heart.classList.add('falling-heart');
            heart.innerHTML = '❤️';
            heart.style.left = Math.random() * 90 + '%';
            heart.style.animationDuration = (Math.random() * 1.5 + 2.5) + 's';
            heart.style.fontSize = (Math.random() * 10 + 14) + 'px';
            seasonNoteBox.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 4200);
        };

        if (openCinematicNoteBtn && seasonNoteModal) {
            openCinematicNoteBtn.addEventListener('click', () => {
                // Populate current season parameters
                if (seasonNoteAvatar) seasonNoteAvatar.src = `assets/profile_${year}.png`;
                if (seasonNotePopupTitle) seasonNotePopupTitle.textContent = `Season ${year} Love Letter ❤️`;
                
                const latestNote = localStorage.getItem(currentNoteKey) || defaultNotes[year] || defaultNotes['1'];
                if (seasonNotePopupText) seasonNotePopupText.textContent = `"${latestNote}"`;

                // Play custom localized season music track
                if (seasonNoteMusicPlayer) {
                    seasonNoteMusicPlayer.src = `assets/year${year}/music.mp3`;
                    seasonNoteMusicPlayer.volume = 0.85;
                    seasonNoteMusicPlayer.currentTime = 0;
                    seasonNoteMusicPlayer.play().catch(e => console.log('Custom music playback status:', e));
                }

                seasonNoteModal.classList.add('show');
                
                if (heartFallTimer) clearInterval(heartFallTimer);
                spawnBoxHeart();
                heartFallTimer = setInterval(spawnBoxHeart, 450);
            });
        }

        const closeSeasonNoteModalHelper = () => {
            if (heartFallTimer) clearInterval(heartFallTimer);
            if (seasonNoteModal) seasonNoteModal.classList.remove('show');
            
            if (seasonNoteMusicPlayer && !seasonNoteMusicPlayer.paused) {
                let v = seasonNoteMusicPlayer.volume;
                const fo = setInterval(() => {
                    if (v > 0.05) {
                        v -= 0.05;
                        seasonNoteMusicPlayer.volume = v;
                    } else {
                        clearInterval(fo);
                        seasonNoteMusicPlayer.pause();
                    }
                }, 40);
            }
        };

        if (closeSeasonNoteModalBtn) {
            closeSeasonNoteModalBtn.addEventListener('click', closeSeasonNoteModalHelper);
        }

        if (seasonNoteModal) {
            seasonNoteModal.addEventListener('click', (e) => {
                // Trigger back/close if clicking the outer backdrop container directly
                if (e.target === seasonNoteModal) {
                    closeSeasonNoteModalHelper();
                }
            });

            // Listen for Escape key to close the Season Love Letter modal
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && seasonNoteModal.classList.contains('show')) {
                    closeSeasonNoteModalHelper();
                }
            });
        }
    }

    // 9. Dedicated Sealed Letters Vault Logic (Visible exclusively on Season 4)
    const sealedVaultSection = document.getElementById('sealedVaultSection');
    if (sealedVaultSection) {
        if (year === '4') {
            sealedVaultSection.style.display = 'block';
            
            // Attach 3D interactive seal breakout logic
            document.querySelectorAll('.sealed-envelope-card').forEach(envCard => {
                envCard.addEventListener('click', (e) => {
                    // Keep open if clicking inside the letter paper itself while already open
                    if (envCard.classList.contains('open') && e.target.closest('.letter-paper')) {
                        return;
                    }
                    // Toggle seal state beautifully
                    envCard.classList.toggle('open');
                });
            });

            // Close open sealed letters when clicking anywhere outside of them
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.sealed-envelope-card')) {
                    document.querySelectorAll('.sealed-envelope-card.open').forEach(card => {
                        card.classList.remove('open');
                    });
                }
            });

            // Close open sealed letters when pressing the Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    document.querySelectorAll('.sealed-envelope-card.open').forEach(card => {
                        card.classList.remove('open');
                    });
                }
            });
        } else {
            sealedVaultSection.style.display = 'none';
        }
    }

});
